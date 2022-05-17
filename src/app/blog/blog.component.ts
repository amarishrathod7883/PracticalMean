import { Component, OnInit } from '@angular/core';
import { BlogService } from '../service/blog.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit 
{
  isLoggedIn = false;
  isDeleted = false;
  getAllBlog: any = [];
  getAllBlogCount = 0;
  role_name?: string;
  searchCondition: any = {};

  // pagination variables START
  p: any;
  pages: any = 1;
  itemsperpage: any = 5;
  totalpages: any;
  totalitems: any;
  showing: any;
  to: any;
  // pagination variables END

  constructor(private AuthService: AuthService, private BlogService: BlogService) { }

  ngOnInit(): void {
    if (Object.keys(this.AuthService.getUser()).length > 0) 
    {
      this.isLoggedIn = true
      const user = this.AuthService.getUser();
      this.role_name = user.data.Role;
      console.log('user', user);

      this.searchCondition = {
        pages: this.pages,
        pageSize: this.itemsperpage 
      };

      if(this.role_name != 'Admin')
      {
        this.searchCondition._id = user._id;
      }
      this.getAllBlogs(this.searchCondition);
    }
  }

  page($pages) 
  {
    this.pages = $pages;
    this.searchCondition.pages = $pages;
    this.getAllBlogs(this.searchCondition);
  }

  itemsPerPage($itemsperpage) 
  {
    this.itemsperpage = $itemsperpage;
    this.searchCondition.pageSize = $itemsperpage;
    this.getAllBlogs(this.searchCondition);
  }

  showingEntry() 
  {
    if (this.pages === this.totalpages) 
    {
      this.showing = ((this.pages * this.itemsperpage) - this.itemsperpage) + 1;
      this.to = this.pages * this.itemsperpage;
    } 
    else 
    {
      this.showing = ((this.pages * this.itemsperpage) - this.itemsperpage) + 1;
      this.to = this.pages * this.itemsperpage;
    }
  }

  getAllBlogs(searchCondition)
  {
    console.log("searchCondition", searchCondition);
    this.BlogService.getAllBlog(searchCondition).subscribe(
      response => {
        console.log("response", response);
        this.getAllBlog = response.data;
        this.getAllBlogCount = response.fetchedBlogCount;
        this.showingEntry();
        this.totalpages = Math.ceil((response.fetchedBlogCount)/this.pages);
        this.totalitems = response.fetchedBlogCount;
        
        console.log("this.getAllBlog", this.getAllBlog);
        console.log("this.getAllBlogCount", this.getAllBlogCount);
      },
      err => {
        this.getAllBlog = JSON.parse(err.error).message;
      }
    );
  }

  removeSingleBlog(id: string): void 
  {
    this.BlogService.removeBlog(id)
      .subscribe(
        res => {
          this.isDeleted = true;
          setTimeout(() => {
            this.isDeleted = false;
            this.getAllBlogs(this.searchCondition);
          }, 500);
        },
        error => {
          console.log(error);
        });
  }

}
