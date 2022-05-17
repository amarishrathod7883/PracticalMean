import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private router: Router, private AuthService: AuthService) { }

  canActivate(): boolean {
    console.log("this.AuthService.getUser()", Object.keys(this.AuthService.getUser()).length);
    if(Object.keys(this.AuthService.getUser()).length > 0)
    {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
  
}
