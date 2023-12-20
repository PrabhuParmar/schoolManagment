import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { UserService } from '../../user/service/user.service';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  constructor(private userService: UserService) { };
  // password Validation 
  PasswordStrengthValidator = (control: AbstractControl) => {
    let value: string = control.value || '';
    var pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;
    let special = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/;
    let number = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-])/;
    let lowerCase = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;
    let upperCase = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;

    return special.test(value) == true || number.test(value) == true || lowerCase.test(value) == true || upperCase.test(value) == true || pattern.test(value) == true ? null : { passwordStrength: true }
  };

  // trim validation 
  trimValidation = (control: AbstractControl) => {
    return control.value !== null && control.value.trim() == '' ? { checkNameValue: true } : null;
  };

  // date validation 
  setDOBValidation = (control: AbstractControl) => {
    let selectedDate = new Date(control.value);
    let todayDate = new Date();
    return selectedDate > todayDate ? { setSelectedDate: true } : null;
  };

  // marks limit 
  setMarksLimit = (control: AbstractControl) => {
    return control.value < 0 || control.value > 100 ? { onMarksLimit: true } : null;
  };

  // school Name validation 
  setSchoolName = (control: AbstractControl) => {
    const schoolNameList = this.userService.schoolNameList.find((user) => user === control.value);
    return schoolNameList ? null : { onSchoolNameCheck: true };
  };
};
