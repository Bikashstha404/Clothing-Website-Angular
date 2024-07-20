import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from './api.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const apiService = inject(ApiService);
  const router = inject(Router);
  
  if (apiService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    alert("Please login first")
    return false;
  }
};
