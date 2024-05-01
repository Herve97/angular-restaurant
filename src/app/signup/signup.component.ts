import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  myform!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.myform = this.fb.group({
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signup() {
    this.http
      .post<any>('http://localhost:3000/signup', this.myform.value)
      .subscribe(
        (res) => {
          alert('You are registered successfully !');
          this.myform.reset();
          this.router.navigate(['login']);
        },
        (error) => {
          console.log(error);
          alert('Something went wrong !!!');
        }
      );
  }
}
