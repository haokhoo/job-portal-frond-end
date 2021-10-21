import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor( 
        private auth: AuthenticationService
    ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => event), // pass further respone
            catchError((error: HttpErrorResponse) => {
                // here will be catched error from response, just check if its 401
                if (error && error.status == 401)
                    // then logout e.g. this.authService.logout()
                    this.auth.logout();
                return throwError(error);
            }));
    }
}