import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const checkLoginGuard: CanActivateFn = (route, state) => {
  //  check user login Or not 
  let loginStatus = localStorage.getItem('loginStatus')
  let routers = inject(Router)
  const _toastr = inject(ToastrService);

  if (loginStatus == 'false') {
    _toastr.error('Session Timeout! Please login again');
    routers.navigate(['login'])
    return false;
  } else {
    return true;
  };
};
