import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  private readonly BASE_URL = 'https://ng-complete-guide-4b80d-default-rtdb.europe-west1.firebasedatabase.app/';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPost();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http.post(this.BASE_URL + 'posts.json',  postData)
    .subscribe(responseDate=>{
      console.log(responseDate);
    });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPost();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPost() {
    this.http.get(this.BASE_URL + 'posts.json').pipe(map(responseDate=>{
      const postsArray =  [];
      for(const key in responseDate){
        if(responseDate.hasOwnProperty(key)){
          postsArray.push({ ...responseDate[key], id: key});
        }
      }
      return postsArray;
    })).subscribe(posts=>{
      console.log(posts);
    });
  }
}
