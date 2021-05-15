import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable, NgZone } from "@angular/core";
import { Observable, of } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { SignalrService } from "../services/signalr.service";
import { Parameters } from "./parameters";

@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {

  private request: HttpRequest<any> | undefined = undefined;
  private next: HttpHandler | undefined = undefined;

  constructor(
    private mockSignalR: SignalrService,
    private ngZone: NgZone) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.request = request;
    this.next = next;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(this.handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(1000))
      .pipe(dematerialize());
  }

  private ok(body?: any): Observable<HttpEvent<any>> {
    return of(new HttpResponse({ status: 200, body }))
  }

  private handleRoute = (): Observable<HttpEvent<any>> => {
    const request = this.request as HttpRequest<any>;
    const next = this.next as HttpHandler;
    const url = request.url;
    const method = request.method;
    switch (true) {
      case url.endsWith('/grot/parameters') && method === 'GET':
        return this.parameters();
      case url.endsWith('/grot/process') && method === 'POST':
        return this.process();
      case url.endsWith('/grot/project') && method === 'POST':
        return this.project(request.body.projectName);
      case url.endsWith('/grot/projects') && method === 'POST':
        return this.projectslist();
      default:
        // pass through any requests not handled above
        return next.handle(request);
    }
  }

  private parameters = (): Observable<HttpEvent<any>> => {
    return this.ok(Parameters);
  }

  private process = (): Observable<HttpEvent<any>> => {
    this.ngZone.runOutsideAngular(() => {
      this.mockSignalR.processFinish();
    });

    return this.ok({ started: true });
  }

  private project = (projectName: string): Observable<HttpEvent<any>> => {
    return this.ok(
      {
        name: projectName,
        outputImageUrls: [
          '/logo.png',
          '/logo.png',
          '/logo.png'
        ],
        inputImageUrl: '',
        parameters: []
      }
    );
  }

  private projectslist = (): Observable<HttpEvent<any>> => {
    return this.ok([
      {
        name: 'project1',
        processing: false
      },
      {
        name: 'project2',
        processing: false
      },
      {
        name: 'project3',
        processing: false
      }
    ]);
  }

}

export let fakeGrotBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: MockBackendInterceptor,
  multi: true
};