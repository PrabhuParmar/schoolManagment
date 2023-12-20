import { Component } from '@angular/core';
import { AuthenticationService } from './component/authentication/service/authentication.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router, private setLoginTokenService: AuthenticationService) {
    // check token valida or not 
    let data: any = sessionStorage.getItem('login');
    this.router.events.subscribe((checkRoute) => {
      if (checkRoute instanceof NavigationEnd) {
        if (data) {
          let setData: any = JSON.parse(data);
          let todayTime = new Date().getTime();
          let diff = todayTime - setData.setTime;
          let days = Math.floor(diff / (60 * 60 * 24 * 1000));
          let hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
          let minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
          if (minutes >= 59 || hours > 0) {
            setLoginTokenService.setRandomToken();
          };
        };
      };
    });
    if (data == null) {
      localStorage.setItem('loginStatus', 'false');
    };
  };
  title = 'exercise-1-to-17';
};
