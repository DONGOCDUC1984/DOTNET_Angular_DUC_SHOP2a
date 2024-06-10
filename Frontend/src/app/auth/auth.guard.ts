import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  payload: any;
  IsAdmin = false;
  constructor(private router: Router) {}
  canActivate(): boolean {
    if (localStorage.getItem('token') != null) {
      this.payload = JSON.parse(
        window.atob(localStorage.getItem('token')!.split('.')[1])
      );
      // console.log(this.payload);
      // console.log('UserName: ' + this.payload.UserName);
      // console.log('Role: ' + this.payload.Role);
      if (this.payload.Role == 'Admin') {
        return true;
      } else {
        this.router.navigate(['/forbidden']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
