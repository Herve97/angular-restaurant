import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  if (!authService.isLoggedIn()) {
    alert('You must be logged in');
    router.navigate(['login']);
    console.log('Not logged in');
    return false;
  }
  console.log('Logged In');
  return true;
};
