import { HttpResponse } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";

export const MockResponses = {
  ok(body?: any): Observable<HttpResponse<any>> {
    return of(new HttpResponse({ status: 200, body }));
  },

  error(message: string): Observable<HttpResponse<any>> {
    return throwError({ error: { message } });
  },

  badRequest(message: string): Observable<HttpResponse<any>> {
    return throwError({ status: 400, error: { message: message } });
  },

  conflict(message: string): Observable<HttpResponse<any>> {
    return throwError({ status: 409, error: { message: message } });
  },

  unauthorized(): Observable<HttpResponse<any>> {
    return throwError({ status: 401, error: { message: 'Unauthorized' } });
  },
}