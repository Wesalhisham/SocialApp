import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { PostsService } from '../../../../core/services/posts/posts.service';
import { Post, User } from '../../../../core/models/post.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommentsComponent } from './comments/comments.component';
import { RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { initFlowbite, Modal } from 'flowbite';

@Component({
  selector: 'app-feed-content',
  imports: [ReactiveFormsModule , CommentsComponent,RouterLink],
  templateUrl: './feed-content.component.html',
  styleUrl: './feed-content.component.css',
})
export class FeedContentComponent implements OnInit {

  private readonly postsService=inject(PostsService);
  private readonly ngxSpinnerService=inject(NgxSpinnerService);

  postList!:Post[]
  userDetails!:User
  userId!:string
  userPhoto!:string
  userName!:string
  saveFile!:File 
  imgUrl: string | ArrayBuffer | null | undefined
  isLiked:boolean=false
  likeIdPost:string='';
  isload:boolean=false;
  isloade:boolean=false;
  updateMode: boolean = false;
updatePostId: string = "";


  @ViewChild('fileInput') fileInput!:ElementRef

  content:FormControl=new FormControl("")
  privacy:FormControl=new FormControl("public")

  shareBody:FormControl= new FormControl("");
  
  
  ngOnInit(): void {
   this.getAllPosts()
   this.userDetails=JSON.parse(localStorage.getItem('socialUser')!)
  this.userId=this.userDetails._id;
  this.userPhoto=this.userDetails.photo
  this.userName=this.userDetails.name
  initFlowbite();
  }

   getAllPosts():void{
    // this.ngxSpinnerService.show()
    this.postsService.getAllPosts().subscribe({
      next:(res)=>{
        this.postList=res.data.posts
        console.log(this.postList)
        // this.ngxSpinnerService.hide()
      },
      error:(err)=>{
        console.log(err)
      }
    })

   }

/////////////////// creat post //////////////////////////////
   changeImge(e:Event):void{
    //save photo
    const input=e.target as HTMLInputElement;
    if(input.files && input.files.length>0){
      this.saveFile=input.files[0];
      console.log(this.saveFile)
    }
   // show photo in html
   // by FileReader class
   const fileReader= new FileReader
   if (this.saveFile) {
      fileReader.readAsDataURL(this.saveFile);
    }
    //
   fileReader.onload=(e:ProgressEvent<FileReader>)=>{
      this.imgUrl=e.target?.result
   }
   }

   deletImg():void{
    this.imgUrl=""
    this.fileInput.nativeElement.value='' //to check the same photo agian if want
   }
   startUpdatePost(post: Post) {
  console.log("Editing post ID:", post._id);
  this.updateMode = true;
  this.updatePostId = post._id;
  this.content.setValue(post.body || "");
  this.privacy.setValue(post.privacy || "public");
  this.imgUrl = post.image || null;
}

  submitForm(e: Event, form: HTMLFormElement): void {
  e.preventDefault();

  const formData = new FormData();
  if (this.content.value) formData.append("body", this.content.value);
  if (this.saveFile) formData.append("image", this.saveFile);
  if (this.privacy.value) formData.append("privacy", this.privacy.value);

  this.isload = true;

  if (this.updateMode && this.updatePostId) {
    // 🔹 PUT request للتحديث
    this.postsService.updatePost(this.updatePostId, formData).subscribe({
      next: (res) => {
        this.isload = false;
        if (res.success) {
          form.reset();
          this.imgUrl = null;
          this.updateMode = false;
          this.updatePostId = "";
          this.getAllPosts();
        }
      },
      error: (err) => {
        console.log(err);
        this.isload = false;
      },
    });
  } else {
    // 🔹 POST جديد
    this.postsService.creatPost(formData).subscribe({
      next: (res) => {
        this.isload = false;
        if (res.success) {
          form.reset();
          this.imgUrl = null;
          this.getAllPosts();
        }
      },
      error: (err) => {
        console.log(err);
        this.isload = false;
      },
    });
  }
}
//////////////////////////////////////////////// dropdown menue
   deletPost(postId:string):void{
    this.isload=true
    this.postsService.deletePost(postId).subscribe({
      next:(res)=>{
        this.isload=false
        console.log(res)
        this.getAllPosts();
      },
      error:(err)=>{
        this.isload=false
        console.log(err);
      
      }
    })
   }

   updatePost(){

   }

   saveUnsave(postId:string):void{
    this.postsService.saveUnsave(postId).subscribe({
      next:(res)=>{
        console.log(res)
        this.getAllPosts()
      },
      error:(err)=>{
        console.log(err)
      }
    })
    
   }
////////////////////////////////////////////////////
    //like
   likeUnlikePost(postId:string):void{
    this.isLiked=true
    this.postsService.likeUnlikePost(postId).subscribe({
      next:(res)=>{
        // console.log(res)
        this.likeIdPost=res.data.post._id
        this.getAllPosts()
        this.isLiked=false
      },
      error:(err)=>{
        console.log(err)
      }
    })
    
   }

   //comments


   //share
   sharePost(postId:string , event:any){
    event.preventDefault();
    
    // this.postsService.sharePost(postId , shareBody).subscribe({

    // })
   }
   

@ViewChild('modal') modalElement!: ElementRef;
private modal!: Modal;

openModal(){
  if(!this.modal){
    this.modal = new Modal(this.modalElement.nativeElement)
  }
  this.modal.show()
}

closeModal(){
  this.modal?.hide()
}





}
