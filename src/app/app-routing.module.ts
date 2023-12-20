import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'add-edit-user',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./component/user/model/user.module').then(mod => mod.UserModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./component/authentication/model/authentication.module').then(mod => mod.AuthenticationModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
