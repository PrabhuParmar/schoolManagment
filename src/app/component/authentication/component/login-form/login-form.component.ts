import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SetHeaderService } from 'src/app/component/layout/service/set-header.service';
import { ValidationService } from 'src/app/component/shared/config/validation.service';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit, OnDestroy {
  constructor(private validationService: ValidationService, private toastService: ToastrService,
    private navBarService: SetHeaderService, private authenticationService: AuthenticationService) { }

  ngOnDestroy(): void {
    this.navBarService.login();
  }
  ngOnInit(): void {
    localStorage.removeItem('loginStatus')
    sessionStorage.removeItem('login')
    this.navBarService.logOut();
  }
  // set Login Form Data 
  loginFormData: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,40}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), this.validationService.PasswordStrengthValidator])
  });

  // submit Login Data 
  submitLoginData = () => {
    this.toastService.success('successfully login')
    this.generateRandomToken()
    this.loginFormData.reset();
  }

  // set Random Token 
  generateRandomToken = () => {
    this.authenticationService.setRandomToken()
  }




}
