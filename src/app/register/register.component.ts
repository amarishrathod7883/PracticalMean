import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {
    FirstName: null,
    LastName: null,
    Email: null,
    Password: null,
    DOB: null,
    Role: null,
  };

  isSuccessful = false;
  errorMessage = '';
  isSignUpFailed = false

  constructor(private AuthService: AuthService) { }

  ngOnInit(): void {
    //$('.datepicker').datepicker();
  }

  onSubmit(): void {
    console.log("this.form", this.form);
    this.form.Role = this.form.Email == 'admin@gmail.com' ? 'Admin' : 'User';
    console.log("this.formfdff", this.form);
    this.AuthService.register(this.form).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;

      },
      err => {
        console.log("err", err);
        this.isSignUpFailed = true;
      });
  }

}
