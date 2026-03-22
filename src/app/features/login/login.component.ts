import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/services/auth.service';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  private readonly authService = inject(AuthService);
  private readonly router= inject(Router)
  private readonly toastrService = inject(ToastrService);
  private readonly ngxSpinnerService =  inject(NgxSpinnerService)

  isLoading:boolean=false;
  mesError:string=''
  loginsubscribe:Subscription=new Subscription;
  
  //FormBuilder
  private readonly fb = inject(FormBuilder);
  loginForm:FormGroup= this.fb.group({
    login:["",[Validators.required , Validators.minLength(3)]],
     password:["",[Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]]
  
  })
  // loginForm:FormGroup= new FormGroup({
  //   login:new FormControl("",[Validators.required , Validators.minLength(3)] ),
  //   password:new FormControl("",[Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)])
  // })
  showpass(e:HTMLInputElement):void{
    if(e.type==='password'){
      e.type='text'
    }
    else{
      e.type='password'
    }
   }
  submitForm():void{
    if(this.loginForm.valid){
      console.log(this.loginForm)
      this.isLoading=true;
      this.loginsubscribe.unsubscribe();
      this.loginsubscribe=this.authService.signIn(this.loginForm.value).subscribe({
        next:(res)=>{
          if(res.success){
            console.log('sucess'+res)
              this.toastrService.success(res.message)

            localStorage.setItem('socialToken' , res.data.token);
            localStorage.setItem('socialUser' , JSON.stringify(res.data.user))
              this.router.navigate(['/feed'])
          } 
        },
        error:(err)=>{
          console.log('err'+err)
          // this.mesError=err.error.message;
          this.isLoading=false;
        },
        complete:()=>{
          this.isLoading=false;
        }
      })
    }
  }
  
  
}
