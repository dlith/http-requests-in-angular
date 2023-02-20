import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Post } from "./post.mode";

@Injectable({providedIn: 'root'})
export class PostService {

    private readonly BASE_URL = 'https://ng-complete-guide-4b80d-default-rtdb.europe-west1.firebasedatabase.app/posts.json';
    error = new Subject<string>;

    constructor(private http: HttpClient){}

    createAndStorePost(title: string, content: string){
      const postData: Post = {title: title, content: content};
      this.http.post<{name: string}>(this.BASE_URL,  postData)
      .subscribe(responseDate=>{
        console.log(responseDate);
      }, error => {
        this.error.next(error.message);
      });
    }

    fetchPosts(){
      return this.http.get<{[key: string]: Post}>(this.BASE_URL, 
        {
          headers: new HttpHeaders({'Custom-Header': 'Hello'})
        })
      .pipe(
        map((responseDate)=>{
        const postsArray: Post[] =  [];
        for(const key in responseDate){
          if(responseDate.hasOwnProperty(key)){
            postsArray.push({ ...responseDate[key], id: key});
          }
        }
          return postsArray;
        }), catchError(errorRes => {
          //Send to analytics server
          return throwError(errorRes);
        }));
    }

    clearPosts(){
      return this.http.delete(this.BASE_URL);
    }
}