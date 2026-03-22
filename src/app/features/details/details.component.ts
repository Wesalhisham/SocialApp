import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostsService } from '../../core/services/posts/posts.service';
import { Post } from '../../core/models/post.interface';
import { CommentsComponent } from "../feed/componants/feed-content/comments/comments.component";
@Component({
  selector: 'app-details',
  imports: [CommentsComponent, RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit{

  // get data from daynamiq routing
  private readonly activatedRoute=inject(ActivatedRoute);

  private readonly postsService = inject(PostsService)
  postId:string=""
  postDetails:Post ={} as Post  // custing

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param)=>{
      console.log(param.get('id'))
      this.postId=param.get('id')!;
    })
    this.getSinglePost();
    
  }
  getSinglePost():void{
    this.postsService.getSinglePost(this.postId).subscribe({
      next:(res)=>{
        console.log(res)
        this.postDetails=res.data.post
      },
      error:(err)=>{
        console.log(err)
      }

    })
  }
  

}
