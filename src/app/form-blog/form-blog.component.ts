import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import { BlogService } from '../service/blog.service';

@Component({
  selector: 'app-form-blog',
  templateUrl: './form-blog.component.html',
  styleUrls: ['./form-blog.component.css']
})
export class FormBlogComponent implements OnInit {

  form: any = {
    _id: null,
    Title: null,
    Description: null,
    ModifyDate: null,
    Status: null,
    Category: null,
    Author: null,
  };

  isUpdateFailed = false;

  currentBlogId: any;
  isSuccessful = false;
  errorMessage = '';

  constructor(private BlogService: BlogService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.currentBlogId = this.route.snapshot.params.id;
    if(this.currentBlogId != 'new')
    {
      this.getSingleBlog(this.currentBlogId)
    }
    
    //$('.datepicker').datepicker();
  }

  getSingleBlog(id): void {
    this.BlogService.getSingleBlog(id)
      .subscribe(
        res => {
          var responseNew = res.data;
          console.log("responseNew", responseNew);
          this.form.Title = responseNew.Title;
          this.form.Description = responseNew.Description;
          this.form.ModifyDate = responseNew.ModifyDate;
          this.form.Status = responseNew.Status;
          this.form.Category = responseNew.Category;
          this.form.Author = responseNew.Author
        },
        error => {
          console.log(error);
        });
  }

  

  onCreateUpdate(): void 
  {
    this.form.role_name = (this.form.role_name == '' ? 'user' : this.form.role_name);
    console.log("this.form", this.form);
    
    this.BlogService.createBlog(this.currentBlogId, this.form).subscribe(
      res => {
        this.isSuccessful = true;
        this.isUpdateFailed = false;
        this.router.navigate(['blog']);
      },
      err => {
        var error = err.error;
        this.errorMessage = error.message;
        this.isUpdateFailed = true;
      }
    );
  }

}
