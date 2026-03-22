import { Component, inject, OnInit } from '@angular/core';
import { SuggestionsService } from '../../../../core/services/suggestions/suggestions.service';
import { NgxSpinnerService } from 'ngx-spinner';
interface suggest{
  followersCount:number
mutualFollowersCount: number
name: string
photo:string 
username: string
_id:string 
}

@Component({
  selector: 'app-suggestions',
  imports: [],
  templateUrl: './suggestions.component.html',
  styleUrl: './suggestions.component.css',
})

export class SuggestionsComponent implements OnInit{
 private readonly suggestionsService= inject(SuggestionsService)
 private readonly ngxSpinnerService= inject(NgxSpinnerService)
 suggestionList:suggest[]=[]
 isLoading:boolean=false;
 currentId:string=''

  ngOnInit(): void {
    this.getSuggestions()
  }

  getSuggestions(){
    // this.ngxSpinnerService.show()
   this.suggestionsService.getFreindSuggestions().subscribe({
    next:(res)=>{
      this.suggestionList=res.data.suggestions
      console.log(this.suggestionList)
      // this.ngxSpinnerService.hide()
    },
    error:(err)=>{
      console.log(err)
    }
   })
  }

  followFriend(friendId:string):void{
        this.isLoading=true;
    this.currentId=friendId
    this.suggestionsService.followFrind(friendId).subscribe({
      next:(res)=>{
        console.log(res)
          this.isLoading=false;

        this.getSuggestions()

      },
      error:(err)=>{
        console.log(err)
        this.isLoading=false
      }
    })
  }
}