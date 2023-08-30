import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, of, retry, throwError, timer } from 'rxjs';

@Injectable()
export class GlobalHttpErrorHandler implements HttpInterceptor {

  // HttpInterceptor -  od apki do api - dołącz token do request albo header
  // HttpErrorInterceptor - od api do apki - catch error
  
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry({
        count: 3,
        delay: (_, retryCount) => timer(retryCount*1000),
      }),
      catchError(err =>{
        console.log('Error handled by HTTP interceptor!')
         return throwError(() => {
           console.log('rethrown!');
           return err;
         })
      })
    );
  }
}
