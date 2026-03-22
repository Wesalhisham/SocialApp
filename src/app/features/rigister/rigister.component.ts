import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../../core/auth/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-rigister',
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './rigister.component.html',
  styleUrl: './rigister.component.css',
})
export class RigisterComponent {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router) // service to make programing routing
  private readonly toastrService = inject(ToastrService)
  mesError:string='';
  isLoading:boolean=false;
  ridsubscribe:Subscription= new Subscription

   rigisterForm:FormGroup = new FormGroup({
    name : new FormControl("" , [Validators.required , Validators.minLength(3)]),
    username: new FormControl(""),
    email: new FormControl("" , [Validators.required , Validators.email]),
    dateOfBirth:new FormControl("", Validators.required),
    gender:new FormControl("male" , Validators.required),
    password:new FormControl("" , [Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
    rePassword:new FormControl("" , Validators.required)

   } , {validators: this.confirmPass})

   confirmPass(group:AbstractControl){

    const password=group.get('password')?.value;
    const repassword= group.get('rePassword')?.value;

    if(password !== repassword && repassword!==''){
      group.get('rePassword')?.setErrors({mismatch:true})
      return {mismatch:true}
    }
    return null

   }
   showpass(e:HTMLInputElement):void{
    if(e.type==='password'){
      e.type='text'
    }
    else{
      e.type='password'
    }
   }

   submitForm():void{
    if(this.rigisterForm.valid){
      console.log(this.rigisterForm.value)
      this.isLoading=true;
      this.ridsubscribe.unsubscribe(); // to cancle many request
      this.ridsubscribe=this.authService.signUp(this.rigisterForm.value).subscribe({
        next:(res)=>{
          if(res.success){
             console.log(res)
              this.toastrService.success(res.success)

          }
        },
        error:(err)=>{
          console.log(err)
          // this.mesError=err.error.message
          this.isLoading=false
        },
        complete:()=>{
          this.isLoading=false;
          this.router.navigate( ['/login'])  // programing routing
        }
      }
    )
    }
    else{
      this.rigisterForm.markAllAsTouched()
    }
   }
}
