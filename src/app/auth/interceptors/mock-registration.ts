import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../models/user";
import { MockResponses } from "./mock-helper";

@Injectable()
export class MockRegistrationnInterceptor implements HttpInterceptor {

  constructor(
    private http: HttpClient
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, body } = request;

    switch (true) {
      case url.endsWith('/register/newuser') && method === 'POST':
        return this.newUser(body);
      default:
        return next.handle(request);
    }
  }

  private newUser(body?: any): Observable<HttpResponse<any>> {
    if (!body.captchaToken) {
      return MockResponses.badRequest("Capcha verification failed");
    }

    //secret for tests purposes (https://docs.hcaptcha.com/)
    return this.http.post('https://hcaptcha.com/siteverify', `response=${body.captchaToken}&secret=0x0000000000000000000000000000000000000000`)
      .pipe(map((result: any) => {
        if (result.success) {
          if (body.username === 'test1') {
            return new HttpResponse({ status: 409, statusText: 'User already exists'});
          }

          const user: User = {
            id: 1,
            username: 'test',
            lastName: '',
            firstName: ''
          };

          return new HttpResponse({ status: 200, body: user });
        } else {
          return new HttpResponse({ status: 400, statusText: 'Captcha verification failed' });
        }
      }));
  }
}

export let fakeRegistrationBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: MockRegistrationnInterceptor,
  multi: true
};