import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment.development';
import { LoginUser } from '../models/loginUser';
import { RegisterUser } from '../models/registerUser';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  userDetails: any;
  IsLoggedIn: boolean = false;
  IsAdmin = false;
  JsonParseToken: any;
  UserName: string = '';
  UserId = '';
  constructor(private http: HttpClient, private router: Router) {}
  url = environment.apiBaseUrl + '/Authenticate';
  showPassword: boolean = false;
  eyeIcon: string = 'fa-solid fa-eye';
  passWordType: string = 'password';

  register(registerUser: RegisterUser) {
    return this.http.post(this.url + '/Register', registerUser);
  }

  login(loginUser: LoginUser) {
    return this.http.post(this.url + '/Login', loginUser);
  }

  getUserProfile() {
    var tokenHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.get(this.url + '/UserProfile', {
      headers: tokenHeader,
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    if (this.eyeIcon == 'fa-solid fa-eye') {
      this.eyeIcon = 'fa-solid fa-eye-slash';
      this.passWordType = 'text';
    } else {
      this.eyeIcon = 'fa-solid fa-eye';
      this.passWordType = 'password';
    }
  }

  CheckIsLoggedIn() {
    if (localStorage.getItem('token')) {
      this.IsLoggedIn = true;
      var helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(localStorage.getItem('token')!);
      //console.log(decodedToken);
      this.UserName = decodedToken.UserName;
      this.UserId = decodedToken.Id;
    }
  }
  CheckIsAdmin() {
    if (localStorage.getItem('token')) {
      this.JsonParseToken = JSON.parse(
        window.atob(localStorage.getItem('token')!.split('.')[1])
      );
      // console.log(this.JsonParseToken);
      if (this.JsonParseToken.Role == 'Admin') {
        this.IsAdmin = true;
      }
    }
  }

  onLogout() {
    localStorage.removeItem('token');
    this.IsAdmin = false;
    this.router.navigate(['/products']);
    this.IsLoggedIn = false;
    this.UserName = '';
  }
}
