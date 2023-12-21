import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { UserService } from '../../service/user.service';
import { UserInterFace } from '../../../shared/shared.model';
import { Router } from '@angular/router';
import { AnimationService } from 'src/app/component/shared/service/animation.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnDestroy {
  userList: UserInterFace[] = [];
  @ViewChild('closeButton') closeButton!: ElementRef;
  deleteUserid!: number;
  setSortingIconSrc: string = '../../../../../assets/image/arrows.png';
  setSortingStatus!: boolean;
  setSortingKeyName: string = '';
  setRoleData: string = 'student';
  animationShow: boolean = false;

  constructor(private userService: UserService, private route: Router, private animation: AnimationService) {
    this.userList = userService.userList;
    userService.updatedUserListData.subscribe(
      (data: UserInterFace | any) => {
        this.userList = data;
      });
    userService.setFilterUserDetails();
  };
  ngOnDestroy(): void {
    this.userService.resetFilterFields();
  };
  // delte user id 
  deleteUserDetails = (id: number | any) => {
    this.deleteUserid = id;
  };
  // filter role user data 
  filterUserListRoleWise = (event: string | any) => {
    this.setRoleData = event.target.value;
    this.userService.setUserRole(this.setRoleData);
  };

  // confirmation delete 
  deleteDetails = () => {
    this.animationShow = true;
    setTimeout(() => {
      this.animationShow = false;
      this.closeButton.nativeElement.click();
      this.userService.onDeleteUserdetails(this.deleteUserid);
    }, 2000);

  };
  // edit user 
  editUserDetails = (id: number | any) => {
    this.userService.editUserData(id);
    this.route.navigate(['/add-edit-user']);
  };

  // set sorting Icon 
  setSortingUserData = (sorting: string) => {
    this.setSortingKeyName = sorting;
    this.setSortingStatus = !this.setSortingStatus;
    this.setSortingStatus == true ? this.setSortingIconSrc = '../../../../../assets//image/arrow-down.png' : this.setSortingIconSrc = '../../../../../assets//image/go-up.png';
  };
  // search user details 
  searchUserDetails = (event: object | any) => {
    this.userService.searchUserData(event.target.value);
  };
  // select standard 
  setStandard = (event: object | any) => {
    this.userService.setUserStandard(event.target.value);
  };
  // select semester 
  setSemester = (event: object | any) => {
    this.userService.setUserSemester(event.target.value);
  };

  // Animation path 
  AnimationOptions = {
    path: this.animation.animationPath
  };

};
