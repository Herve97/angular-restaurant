import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  myform!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.myform = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.http.get<any>('http://localhost:3000/signup').subscribe(
      (res) => {
        console.log(res);
        // const user = res.find((data: any) => {
        //   return (
        //     data.email === this.myform.value.email &&
        //     data.password === this.myform.value.password
        //   );
        // });
        if (
          res.email === this.myform.value.email &&
          res.password === this.myform.value.password
        ) {
          // alert('You are logged successfully !');
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'You are logged successfully !',
            duration: 5000,
            position: 'topCenter',
          });
          this.myform.reset();
          localStorage.setItem('loginData', JSON.stringify(res));
          localStorage.setItem(
            'token',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkJlbml0aGEiLCJpYXQiOjE1MTYyMzkwMjJ9.dT4kXCiVJjT1uvtokc8DZk6PRE3NvLXEqhpXzmnnP5I'
          );
          this.router.navigate(['restaurant']);
        } else {
          // alert('User not found');
          this.toast.error({
            detail: 'ERROR',
            summary: 'User not found',
            sticky: true,
            duration: 8000,
          });
        }
      },
      (error) => {
        console.log(error);
        // alert('Something went wrong !!!');
        this.toast.error({
          detail: 'ERROR',
          summary: 'Something went wrong !!!',
          sticky: true,
          duration: 8000,
        });
      }
    );
  }
}
