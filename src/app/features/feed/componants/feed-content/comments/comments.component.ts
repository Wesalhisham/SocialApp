import { Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { CommentsService } from './comments.service';
import {Comment} from './comment.interface'
import { User } from '../../../../../core/models/post.interface';
import { FormControl,ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-comments',
  imports: [ReactiveFormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent implements OnInit {

  private readonly commentsService = inject(CommentsService);

   userPhoto!:string
   userDetails!:User
   saveFilecomment!:File
   isload:boolean=false
   isloading:boolean=false
    imgUrlcomment:string | ArrayBuffer | null | undefined=null
updateMode: boolean = false;   // هل احنا في وضع التحديث
updateCommentId: string = "";  // ID التعليق اللي هيتحدث
  

     @ViewChild('fileInputcomment') fileInputcomment!:ElementRef
   commentBody:FormControl= new FormControl("")

  @Input() postId:string=""
  commentList:Comment[]=[]

  ngOnInit(): void {
      this.getAllComments()
         this.userDetails=JSON.parse(localStorage.getItem('socialUser')!)
        this.userPhoto=this.userDetails.photo
  }

 
////////////////////////////// creat comment ////////////////////////////////////////
  changeImgecomment(e:Event):void{
    //save photo
    const input=e.target as HTMLInputElement;
    if(input.files && input.files.length>0){
      this.saveFilecomment=input.files[0];
      console.log(this.saveFilecomment)
    }
   // show photo in html
   // by FileReader class
   const fileReader= new FileReader()
   if (this.saveFilecomment) {
      fileReader.readAsDataURL(this.saveFilecomment);
    }
    //
   fileReader.onload=(e:ProgressEvent<FileReader>)=>{
      this.imgUrlcomment=e.target?.result
   }
   }

   deletImg():void{
    this.imgUrlcomment=""
    this.fileInputcomment.nativeElement.value='' //to check the same photo agian if want
   }

  
/////////////////////////////////////////// delete comment
deletPost(postId:string , commentId:string):void{
    this.isloading=true
    this.commentsService.deletComment(postId , commentId).subscribe({
      next:(res)=>{
        this.isloading=false
        console.log(res)
        this.getAllComments();
      },
      error:(err)=>{
        this.isloading=false
        console.log(err);
      
      }
    })
   }

// عند الضغط على زر Update
startUpdateComment(comment: Comment) {
  this.updateMode = true;
  this.updateCommentId = comment._id;
  this.commentBody.setValue(comment.content || '');
  this.imgUrlcomment = comment.imge || null;
}

// تعديل submitForm لدعم التحديث
submitForm(e: Event, form: HTMLFormElement) {
  e.preventDefault();

  const formData = new FormData();
  if (this.commentBody.value) formData.append("content", this.commentBody.value);
  if (this.saveFilecomment) formData.append("image", this.saveFilecomment);

  this.isload = true;

  if (this.updateMode) {
    // PUT endpoint
    this.commentsService.updateComment(this.postId, this.updateCommentId, formData).subscribe({
      next: (res) => {
        this.isload = false;
        if (res) {
          form.reset();
          this.imgUrlcomment = null;
          this.updateMode = false;
          this.updateCommentId = "";
          this.getAllComments();
        }
      },
      error: (err) => {
        console.log(err);
        this.isload = false;
      }
    });
  } else {
    // POST جديد
    this.commentsService.creatComment(formData, this.postId).subscribe({
      next: (res) => {
        this.isload = false;
        if (res.success) {
          form.reset();
          this.imgUrlcomment = null;
          this.getAllComments();
        }
      },
      error: (err) => {
        console.log(err);
        this.isload = false;
      }
    });
  }
}

  
//////////////////////////////////////////////
  getAllComments():void{
    this.commentsService.getPostComment(this.postId).subscribe({
      next:(res)=>{
        console.log(res.data.comments);
        this.commentList=res.data.comments
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }
}
