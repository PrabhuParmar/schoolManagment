import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./component/user/module/user.module').then(mod => mod.UserModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./component/authentication/module/authentication.module').then(mod => mod.AuthenticationModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
