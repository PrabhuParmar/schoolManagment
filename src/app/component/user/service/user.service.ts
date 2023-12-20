import { Injectable } from '@angular/core';
import { UserInterFace } from '../../shared/interFace/user-inter-face';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  schoolNameList: string[] = [
    'St. Pauls School, Rajkot',
    'Shree C N Mehta High School',
    'SWASTIK SCHOOL',
    'ATMIYA School',
    'Arya Schools',
    'Sinhar School',
    'Kendriya Vidyalaya Rajkot'
  ];
  updatedUserListData = new Subject<any>()
  userList: UserInterFace[] = [];
  setRoleData: string = 'student';
  editIndex!: number;
  editUserDetails!: UserInterFace
  setSearch: string = '';
  setStandard: string = '';
  setSemester: string = '';


  // set new User Form Data 
  setUserFormDetails = (user: UserInterFace) => {
    let min = 100000000000;
    let max = 999999999999;
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    this.userList.push({
      ...user,
      id: randomNumber
    }
    );
    this.updatedUserListData.next(this.userList);
  };

  // delete User Details 
  onDeleteUserdetails = (id: number) => {
    let deleteIndex = this.userList.findIndex((data) => {
      return data.id == id;
    });
    this.userList.splice(deleteIndex, 1);
    this.updatedUserListData.next(this.userList);
    this.setFilterUserDetails();
  };
  // user Role Filter Data 
  setUserRole = (role: string) => {
    this.setRoleData = role;
    this.setFilterUserDetails();
  };
  // search Filter Details 
  searchUserData = (search: string) => {
    this.setSearch = search.toLowerCase();
    this.setFilterUserDetails();
  };
  // filter standard 
  setUserStandard = (std: string) => {
    this.setStandard = std;
    this.setFilterUserDetails();
  };
  // filter Semester 
  setUserSemester = (sem: string) => {
    this.setSemester = sem;
    this.setFilterUserDetails();
  };
  // filterData 
  setFilterUserDetails = () => {
    let fields = {
      role: this.setRoleData,
      search: this.setSearch,
      standard: this.setStandard,
      semester: this.setSemester,
    };

    // filter Details 
    let setUpdatedData = this.userList.filter((data: UserInterFace | any) => {
      let role = data.role === fields.role;
      let name = data.name.toString().trim().toLowerCase().search(fields.search) !== -1;
      let school = data.schoolName.toString().trim().toLowerCase().search(fields.search) !== -1;
      let email = data.email.toString().trim().toLowerCase().search(fields.search) !== -1;
      let phoneNumber = data.phoneNumber.toString().search(fields.search) !== -1;
      let standard = data.standard.search(fields.standard) !== -1;
      let semester;
      let checkSearch = name || email || school || phoneNumber;
      let stdFields;

      if (data.semester != null || data.semester != undefined) {
        semester = data.semester.search(fields.semester) !== -1;
      };

      fields.role == 'student' ? stdFields = semester && standard : stdFields = standard;
      return data ? checkSearch && role && stdFields : (checkSearch && stdFields) && role;
    });
    this.updatedUserListData.next(setUpdatedData);
  };

  // edit User Details 
  editUserData = (id: number) => {
    this.editIndex = this.userList.findIndex((data) => {
      return data.id == id;
    });
    this.editUserDetails = this.userList[this.editIndex];
  };
  //  Update User Details 
  updateStudentDetails = (user: UserInterFace) => {
    let setUpdatedUserData = {
      ...user,
      id: this.userList[this.editIndex].id
    };
    this.userList[this.editIndex] = setUpdatedUserData;
  };

  // reset All Filter Fields 
  resetFilterFields = () => {
    this.setRoleData = 'student';
    this.setSearch = '';
    this.setStandard = '';
    this.setSemester = '';
  };
};
