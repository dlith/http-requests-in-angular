import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Post } from "./post.mode";

@Injectable({providedIn: 'root'})
export class PostService {

    private readonly BASE_URL = 'https://ng-complete-guide-4b80d-default-rtdb.europe-west1.firebasedatabase.app/';

    constructor(private http: HttpClient){}

    createAndStorePost(title: string, content: string){
        const postData: Post = {title: title, content: content};
        this.http.post<{name: string}>(this.BASE_URL + 'posts.json',  postData)
        .subscribe(responseDate=>{
        console.log(responseDate);
        });
    }

    fetchPosts(){
        this.http.get<{[key: string]: Post}>(this.BASE_URL + 'posts.json')
        .pipe(
            map((responseDate)=>{
            const postsArray: Post[] =  [];
            for(const key in responseDate){
              if(responseDate.hasOwnProperty(key)){
                postsArray.push({ ...responseDate[key], id: key});
              }
            }
                return postsArray;
            }))
        .subscribe(posts=>{
            //console.log(posts);
        });
    }
}