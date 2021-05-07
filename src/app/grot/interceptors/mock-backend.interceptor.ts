import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/grot/parameters') && method === 'GET':
          return parameters();
        case url.endsWith('/grot/process') && method === 'POST':
          return process();
        case url.endsWith('/grot/projectslist') && method === 'POST':
          return projectslist();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    function projectslist(){
      return ok([
        {
          name: 'project1',
          outputImageUrls: [
            'https://upload.wikimedia.org/wikipedia/commons/a/a0/Cerkev-MarijinoObiskanje-Ljubljana-Roznik.JPG',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Olympia_%2832849615377%29_%28cropped%29.jpg/800px-Olympia_%2832849615377%29_%28cropped%29.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/8/86/Loschwitz_Bergschwebebahn_1902.jpg'
          ],
          inputImageUrl: '',
          parameters: []
        },
        {
          name: 'project2',
          outputImageUrls: [
            'https://upload.wikimedia.org/wikipedia/commons/a/a0/Cerkev-MarijinoObiskanje-Ljubljana-Roznik.JPG',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Olympia_%2832849615377%29_%28cropped%29.jpg/800px-Olympia_%2832849615377%29_%28cropped%29.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/8/86/Loschwitz_Bergschwebebahn_1902.jpg'
          ],
          inputImageUrl: '',
          parameters: []
        }
      ]);
    }

    function process() {
      return ok({ started: true });
    }

    function parameters() {
      return ok([
        {
          "name": "scale",
          "displayName": "Scale",
          "type": "number",
          "default": "1"
        },
        {
          "name": "thickness",
          "displayName": "Thickness",
          "type": "number",
          "default": "1"
        },
        {
          "name": "load",
          "displayName": "Force direction (X/Y)",
          "type": "load",
          "default": "0 -800 f0f"
        },
        {
          "name": "disp",
          "displayName": "Displacements",
          "type": "multiSelect",
          "default": "",
          "options": [
            {
              "name": "X",
              "value": "x"
            },
            {
              "name": "Y",
              "value": "y"
            },
            {
              "name": "Mag",
              "value": "mag"
            }
          ]
        },
      ]);
    }

    function ok(body?: any) {
      return of(new HttpResponse({ status: 200, body }))
    }
  }

}

export let fakeGrotBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: MockBackendInterceptor,
  multi: true
};