import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {
    Email: null,
    Password: null,
  };

  isLoggedIn = false;
  isLoggedInFailed = false;
  errorMessage = '';

  constructor(private AuthService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(Object.keys(this.AuthService.getUser()).length > 0)
    {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    console.log("this.form", this.form);
    console.log("this.formfdff", this.form);
    this.AuthService.login(this.form.Email, this.form.Password).subscribe(
      data => {
        console.log('data', data);
        this.isLoggedIn = true;
        this.isLoggedInFailed = false;
        this.AuthService.setUser(data)
        this.router.navigate(['blog']);
      },
      err => {
        console.log("err", err);
        this.isLoggedInFailed = true;
        this.errorMessage = err.error.message;
      });
  }

}
