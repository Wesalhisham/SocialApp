import { Component, inject, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../../../core/auth/services/auth.service';
import { User } from '../../../../core/models/user.interface';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private readonly authService = inject(AuthService)

  userDetails!:User
    userPhoto!:string
    userName!:string

  ngOnInit(): void {
      initFlowbite();
      this.userDetails=JSON.parse(localStorage.getItem('socialUser')!)
  this.userPhoto=this.userDetails.photo
  this.userName=this.userDetails.name
  }
  logOut():void{
    this.authService.signOut()
  }


}
