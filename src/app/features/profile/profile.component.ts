import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/services/auth.service';
import { Profile } from '../../profile.interface';
import { User } from '../../core/models/user.interface';
import { ProfileService } from '../../profile.service';
import { Post } from '../../core/models/post.interface';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {

  private readonly profileService = inject(ProfileService);
  userPhoto!:string
  userId!:string
  boomarksList!:any
  postList!:any
  profileList!:Profile
  saveFileImg!:File
  imgUrlProfile:string | ArrayBuffer | null | undefined=null
  bookmark:boolean=false
  post:boolean=true

  ngOnInit(): void {
    this.getprofile()
    this.getSavePost()
  

  }
  getprofile():void{
    this.profileService.getMyProfile().subscribe({
      next:(res)=>{
        console.log(res)
        this.profileList=res.data.user
          this.userId = this.profileList._id;
          this.userPhoto=this.profileList.photo

      this.getPosts(this.userId);
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  getSavePost():void{
     
    this.profileService.getBookmarks().subscribe({
      next:(res)=>{
       
        this.boomarksList=res.data.bookmarks
        console.log(this.boomarksList)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  getPosts(userId:string):void{
    if (!this.userId) return; 
    this.profileService.getPosts(userId).subscribe({
      next:(res)=>{
        this.postList=res.data.posts
        console.log('posts', res)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  uploadPhoto(e:Event):void{

      
    //save photo
    const input=e.target as HTMLInputElement;
 if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    this.saveFileImg = file;      
   // show photo in html
   // by FileReader class
   const fileReader = new FileReader();
    fileReader.readAsDataURL(this.saveFileImg);

    fileReader.onload = () => {
      this.imgUrlProfile = fileReader.result;
    };
    //appent form data
    const formData = new FormData();
    if(this.saveFileImg) formData.append("photo",this.saveFileImg)


    this.profileService.uploadProfilePhoto(formData).subscribe({
      next:(res)=>{
         const newPhoto = res.data.photo;

  this.profileList.photo = newPhoto;
  this.userPhoto = newPhoto;

  // 🔥 update localStorage
  const user = JSON.parse(localStorage.getItem('socialUser')!);
  user.photo = newPhoto;
  localStorage.setItem('socialUser', JSON.stringify(user));

  this.imgUrlProfile = null;
        
      },
      error:(err)=>{
        console.log(err)
      }
    })

    this.getPosts(this.userId)
  }

  bookmarkButton(){
    this.bookmark=true
    this.post=false
  }
  postButton(){
    this.post=true
    this.bookmark=false
  }

}
