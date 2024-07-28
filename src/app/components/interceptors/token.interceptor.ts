import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const myToken = authService.getToken();
  const toast = inject(NgToastService)
  const router = inject(Router)

  if(myToken){
    req = req.clone({
      setHeaders: {Authorization: `Bearer ${myToken}`}
    })
  }

  return next(req).pipe(
    catchError((err: any)=>{
      if(err instanceof HttpErrorResponse){
        if(err.status == 401){
          toast.warning("Token is expired. Please Login Again", "Warning", 5000);
          router.navigate(['login']);
        }
      }
      return throwError(()=> new Error("Some other error occured."))
    })
  );
};
