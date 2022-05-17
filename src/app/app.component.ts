import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
{
  isLoggedIn = false;

  constructor(private router: Router, private AuthService: AuthService)
  {
    
    console.log("this.isLoggedIn", this.isLoggedIn);
    if(Object.keys(this.AuthService.getUser()).length > 0)
    {
      this.isLoggedIn = true;
      const user = this.AuthService.getUser();
    }
  }

  logout(): void
  {
    window.sessionStorage.clear();
    this.router.navigate(['login'])
  }
}
