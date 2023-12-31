import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // set New Token 
  setRandomToken = () => {
    let setTime = new Date().getTime();
    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token: string = '';
    for (let item = 0; item < 40; item++) {
      token += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    };
    sessionStorage.setItem('login', JSON.stringify({ token, setTime }));
    localStorage.setItem('loginStatus', 'true');
  };
};
