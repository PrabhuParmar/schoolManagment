import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/component/shared/service/validation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnDestroy, OnInit {
  schoolNameList: string[] = [];
  searchValue: string = '';
  setSubmitBtnMode: boolean = false;
  constructor(private userSerice: UserService, private setValidationService: ValidationService, private router: Router) {
    this.schoolNameList = userSerice.schoolNameList;
  }
  ngOnInit(): void {
    if (this.userSerice.editUserDetails == undefined || this.userSerice.editUserDetails.name == null) {
      this.setSubmitBtnMode = false;
    } else {
      this.searchValue = this.userSerice.editUserDetails.schoolName;
      this.checkUserRole(this.userSerice.editUserDetails.role);
      this.setSubmitBtnMode = true;
      this.userFormDetails.patchValue({
        ...this.userSerice.editUserDetails
      });
    };
  };
  ngOnDestroy(): void {
    this.userFormDetails.reset();
    this.userSerice.editUserDetails = this.userFormDetails.value;
  };
  // set Search dropdown value 
  setDropdownItemValue = (userData: any) => {
    this.searchValue = userData;
  };

  // set user Form  Details 
  userFormDetails: FormGroup = new FormGroup({
    role: new FormControl('student', []),
    schoolName: new FormControl('', [Validators.required, this.setValidationService.setSchoolName]),
    name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), this.setValidationService.trimValidation]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,40}$')]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{10}$")]),
    dob: new FormControl('', [Validators.required, this.setValidationService.setDOBValidation]),
    gender: new FormControl('male', []),
    address: new FormControl('', [Validators.required, this.setValidationService.trimValidation]),
    standard: new FormControl('1', []),
    semester: new FormControl('1', []),
    medium: new FormControl('gujarati', []),
    qrCodeStatus: new FormControl(false, []),
  });
  // set Role Input Field
  checkUserRole = (role: string) => {
    if (role == 'student') {
      this.userFormDetails.addControl('semester', new FormControl('1', []));
      this.userFormDetails.addControl('medium', new FormControl('gujarati', []));
      this.userFormDetails.removeControl('subject');
      this.userFormDetails.removeControl('qualification');
    } else {
      this.userFormDetails.addControl('subject', new FormControl('hindi', []));
      this.userFormDetails.addControl('qualification', new FormControl('', [Validators.required, this.setValidationService.trimValidation]));
      this.userFormDetails.removeControl('semester');
      this.userFormDetails.removeControl('medium');
    };

    this.userFormDetails.patchValue({
      semester: '1',
      medium: 'gujarati',
      subject: 'hindi',
      standard: '1',
    });
  };

  // submit user Details 
  submitUserDetails = () => {
    this.setSubmitBtnMode == false ? this.userSerice.setUserFormDetails(this.userFormDetails.value) : this.userSerice.updateStudentDetails(this.userFormDetails.value)
    this.router.navigate(['/user-list']);
    this.setSubmitBtnMode = false;
    this.userFormDetails.reset();
    this.searchValue = '';
    this.userFormDetails.patchValue({
      role: 'student',
      gender: 'male',
    });
    this.checkUserRole('student');
  };

};
