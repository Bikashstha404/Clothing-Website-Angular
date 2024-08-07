import { HttpErrorResponse, HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { TokenApiModel } from '../model/token-api.model';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const myToken = authService.getToken();
  const toast = inject(NgToastService)
  const toastr = inject(ToastrService)
  const router = inject(Router)

  if (myToken) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${myToken}` }
    })

    return next(req).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status == 401 || err.status == 0) {
            // toastr.warning("Token is expired. Please Login Again", "Warning");
            // router.navigate(['login']);
            return handleUnAuthorizedError(req, next);
          }
        }
        return throwError(() => new Error("Some other error occured"))
      })
    )
  }

  function handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandlerFn) {
    let tokenApiModel = new TokenApiModel();
    tokenApiModel.accessToken = authService.getToken()!;
    tokenApiModel.refreshToken = authService.getRefreshToken()!;
    return authService.renewToken(tokenApiModel)
      .pipe(
        switchMap((data: TokenApiModel) => {
          authService.storeToken(data.accessToken);
          authService.storeRefreshToken(data.refreshToken)
          req = req.clone({
            setHeaders: { Authorization: `Bearer ${data.accessToken}` }
          })
          return next(req);
        }),
        catchError((err) => {
          return throwError(() => {
            console.log("Naruto: ",err?.error.message)
            toastr.warning("Token is expired. Please Login Again", "Warning");
            router.navigate(['login']);
          })
        })
      )

  }

  return next(req);
};
