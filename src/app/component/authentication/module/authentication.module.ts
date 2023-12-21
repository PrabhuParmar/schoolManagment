import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from '../component/login-form/login-form.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LottieModule } from 'ngx-lottie';
// Export this function
export function playerFactory(): any {
  return import('lottie-web');
}
const routes: Routes = [
  {
    path: '',
    component: LoginFormComponent
  },
]

@NgModule({
  declarations: [
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    LottieModule.forRoot({ player: playerFactory }),
  ],
  exports: [
    RouterModule
  ]
})
export class AuthenticationModule { }
