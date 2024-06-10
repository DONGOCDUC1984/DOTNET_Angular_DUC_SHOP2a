import { RegisterUser } from 'src/app/models/registerUser';
import { UserService } from 'src/app/service/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerUser: RegisterUser = {
    username: '',
    email: '',
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
    //  this.myForm.reset();
    this.myForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  get f() {
    return this.myForm.controls;
  }
  Submit() {
    var body = {
      username: this.myForm.value.username,
      email: this.myForm.value.email,
      password: this.myForm.value.password,
    };
    this.userService.register(body).subscribe({
      next: (res) => {
        // console.log(res);
        this.myForm.reset();
        this.router.navigate(['/login']);
        Swal.fire({
          title: 'Good job!',
          text: 'Successfully registered.Please login',
          icon: 'success',
        });
      },
      error: (err) => {
        // console.log(err);
        // console.log(err.error.message);
        this.message1 = err.error.message;
      },
    });
  }
}
