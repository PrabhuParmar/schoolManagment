import { Component, OnDestroy } from '@angular/core';
import { SetHeaderService } from '../service/set-header.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {
  showNavBar: boolean = true;
  subscription: Subscription | any;
  constructor(private setNavbarService: SetHeaderService) {
    this.subscription = setNavbarService.loggedIn?.subscribe((data) => {
      this.showNavBar = data;
    });
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  };

  onLogout = () => {
    localStorage.setItem('loginStatus', 'false');
  };
};
