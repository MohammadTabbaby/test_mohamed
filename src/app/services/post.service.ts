import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Post } from '../models/post.model';

@Injectable()
export class PostService {
  selectedPost!: Post;
  posts!: Post[];
  readonly baseURL = 'http://localhost:3000/post';

  constructor(public http: HttpClient) { }

  postPost(po: Post) {
    return this.http.post(this.baseURL, po);
  }

  getPostList() {
    return this.http.get(this.baseURL);
  }

  putPost(po: Post) {
    return this.http.put(this.baseURL + `/${po._id}`, po);
  }

  deletePost(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

  refreshPostList() {
    this.getPostList().subscribe((res) => {
      this.posts = res as Post[];
    });
  }
}