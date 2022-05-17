import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const AUTH_API = 'http://localhost:8080/api/auth/';

const USER_KEY = 'auth-user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(Email: string, Password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {Email, Password}, httpOptions);
  }

  register(formdata): Observable<any> {
    return this.http.post(AUTH_API + 'signup', formdata, {responseType: 'text'}).pipe((map(res => JSON.parse(res))));
  }

  public setUser(data): void {
    window.sessionStorage.removeItem(USER_KEY);
    const user = window.sessionStorage.setItem(USER_KEY, JSON.stringify(data));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if(user){
      return JSON.parse(user);
    }
    return {};
  }
}
