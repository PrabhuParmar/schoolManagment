import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddEditUserComponent } from "../component/add-edit-user/add-edit-user.component";
import { UserListComponent } from "../component/user-list/user-list.component";
import { checkLoginGuard } from "../../shared/Auth/check-login.guard";

const routes: Routes = [
    {
        path: 'add-edit-user',
        component: AddEditUserComponent,
        canActivate: [checkLoginGuard]
    },
    {
        path: 'user-list',
        component: UserListComponent,
        canActivate: [checkLoginGuard]
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AppUserRoutingModule { }