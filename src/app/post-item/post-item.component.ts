import { Component , OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';
import { faPenToSquare , faTrash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css'],
  providers: [PostService]
})
export class PostItemComponent {
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;

  constructor(public postService: PostService) { }

  ngOnInit() {
    this.resetForm();
    this.postService.refreshPostList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.postService.selectedPost = {
      _id: "",
      titre: "",
      contenu: "",
    }
  }

  
  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.postService.postPost(form.value).subscribe((res) => {
        this.resetForm(form);
        this.postService.refreshPostList();
        alert('post ajouté !');
      });
    }
    else {
      this.postService.putPost(form.value).subscribe((res) => {
        this.resetForm(form);
        this.postService.refreshPostList();
        alert('post modifié !');
      });
    }
  }
  
  onEdit(po: Post) {
    this.postService.selectedPost = po;
    this.postService.refreshPostList();
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this post ?') == true) {
      this.postService.deletePost(_id).subscribe((res) => {
        this.resetForm(form);
        alert('post supprimé !');
        this.postService.refreshPostList();
      });
    }
  }

}
