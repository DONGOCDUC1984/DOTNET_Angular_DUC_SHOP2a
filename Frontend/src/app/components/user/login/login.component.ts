import { UserService } from 'src/app/service/user.service';
import { LoginUser } from 'src/app/models/loginUser';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginUser: LoginUser = {
    username: '',
    password: '',
  };

  myForm!: FormGroup;
  message1 = '';
  constructor(
    public userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    // What is in ngOnInit , can be written in constructor with the same effect

    this.myForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/');
    }
  }
  get f() {
    return this.myForm.controls;
  }

  Submit() {
    // console.log(this.myForm);
    this.userService.login(this.myForm.value).subscribe({
      next: (res: any) => {
        // console.log(res);
        localStorage.setItem('token', res.token);
        //this.userService.CheckIsAdmin();
        // If I only write the above line without the following ,
        // even Admin will not allowed to see all orders.

        this.userService.JsonParseToken = JSON.parse(
          window.atob(localStorage.getItem('token')!.split('.')[1])
        );

        if (this.userService.JsonParseToken.Role == 'Admin') {
          this.userService.IsAdmin = true;
        }

        this.userService.CheckIsLoggedIn();
        this.userService.IsLoggedIn = true;
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        console.log(err);
        this.message1 = 'Authentication failed.Incorrect username or password.';
      },
    });
  }
}
