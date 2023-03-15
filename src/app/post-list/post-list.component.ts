import { Component , OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  providers: [PostService]
})

export class PostListComponent implements OnInit{
  constructor(public postService: PostService) { }

  ngOnInit() {
    this.postService.refreshPostList();
  }

}
