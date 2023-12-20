import { Component, OnDestroy, OnInit } from '@angular/core';
import { SetHeaderService } from '../service/set-header.service';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../authentication/service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {

  showNavBar: boolean = true;
  subscription: Subscription | any;
  constructor(private setNavbarService: SetHeaderService, private setAuthenticationService: AuthenticationService) {
    this.subscription = setNavbarService.loggedIn?.subscribe((data) => {
      this.showNavBar = data
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onLogout = () => {
    localStorage.setItem('loginStatus', 'false')
  }


}
