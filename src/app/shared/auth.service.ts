import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  isLoggedIn() {
    console.log('Service');
    return !!localStorage.getItem('token');
  }
}
