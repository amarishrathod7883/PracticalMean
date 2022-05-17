import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const AUTH_API = 'http://localhost:8080/api/blog/';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  getAllBlog(searchCondition): Observable<any> {
    return this.http.post(AUTH_API + 'getAllBlog', searchCondition, { responseType: 'text'}).pipe(map(res => JSON.parse(res)));
  }


  getSingleBlog(id): Observable<any> {
    return this.http.get(AUTH_API + 'getSingleBlog/'+ id, { responseType: 'text'}).pipe(map(res => JSON.parse(res)));
  }


  createBlog(id, data): Observable<any> {
    return this.http.post(AUTH_API + 'createBlog/' + id, data, { responseType: 'text'}).pipe(map(res => JSON.parse(res)));
  }


  removeBlog(id): Observable<any> {
    return this.http.get(AUTH_API + 'removeBlog/' + id, { responseType: 'text'}).pipe(map(res => JSON.parse(res)));
  }
}
