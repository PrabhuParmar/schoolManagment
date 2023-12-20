import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditUserComponent } from '../component/add-edit-user/add-edit-user.component';
import { UserListComponent } from '../component/user-list/user-list.component';
import { AppUserRoutingModule } from './app-user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../service/user.service';
import { QRCodeModule } from 'angularx-qrcode';
import { SharedModule } from '../../shared/shared.module';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AddEditUserComponent,
    UserListComponent,
  ],
  providers: [UserService],
  imports: [
    AppUserRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    QRCodeModule,
    NgbTooltipModule,
    FormsModule,
    SharedModule

  ]
})
export class UserModule { }
