import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.mode';
import { PostService } from './post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  private errorSub: Subscription;

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {
    this.errorSub = this.postService.error.subscribe(errorMessage=>{
      this.error = errorMessage;
    });

    this.isFetching = true;
    this.postService.fetchPosts().subscribe(posts=>{
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
      this.isFetching = false;
      this.error = error.message;
      console.log(error);
    });
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPost();
  }

  onClearPosts() {
    // Send Http request
    this.postService.clearPosts().subscribe(()=>{
      console.log('Posts were deleted');
      this.loadedPosts = [];
    }, error => {
      this.error = error.message;
    });
  }

  private fetchPost() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(posts=>{
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
      this.isFetching = false;
      this.error = error.message;
      console.log(error);
    });
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy(){
    this.errorSub.unsubscribe();
  }
}
