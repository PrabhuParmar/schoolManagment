import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SetHeaderService } from 'src/app/component/layout/service/set-header.service';
import { ValidationService } from 'src/app/component/shared/service/validation.service';
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';
import { AnimationService } from 'src/app/component/shared/service/animation.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit, OnDestroy {
  animationShow: boolean = false;
  constructor(private validationService: ValidationService, private toastService: ToastrService, private animation: AnimationService,
    private navBarService: SetHeaderService, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnDestroy(): void {
    this.navBarService.login();
  };
  ngOnInit(): void {
    localStorage.removeItem('loginStatus');
    sessionStorage.removeItem('login');
    this.navBarService.logOut();
  };
  // set Login Form Data 
  loginFormData: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,40}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), this.validationService.PasswordStrengthValidator])
  });

  // submit Login Data 
  submitLoginData = () => {
    this.animationShow = true;
    setTimeout(() => {
      this.animationShow = false;
      this.router.navigate(['/user-list']);;
      this.toastService.success('successfully login')
      this.generateRandomToken();
      this.loginFormData.reset();
    }, 2000);
  };

  // Animation path 
  AnimationOptions = {
    path: this.animation.animationPath
  };
  // set Random Token 
  generateRandomToken = () => {
    this.authenticationService.setRandomToken();
  };
};
