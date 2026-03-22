import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { AuthService } from '../../core/auth/services/auth.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-change-pas',
  imports: [ReactiveFormsModule],
  templateUrl: './change-pas.component.html',
  styleUrl: './change-pas.component.css',
})
export class ChangePasComponent {

  private readonly authService=inject(AuthService)
    private readonly toastrService = inject(ToastrService)
      private readonly router = inject(Router) // service to make programing routing


    ridsubscribe:Subscription= new Subscription
  

  isLoading:boolean=false
  changeForm:FormGroup=new FormGroup({
    password:new FormControl("" , [Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
    newPassword:new FormControl("" , [Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
    // rePassword:new FormControl("" , Validators.required)


  })

  confirmPass(group:AbstractControl){

    const password=group.get('newPassword')?.value;
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
    if(this.changeForm.valid){
      console.log(this.changeForm.value)
      this.isLoading=true;
      this.ridsubscribe.unsubscribe(); // to cancle many request
      this.ridsubscribe=this.authService.changePass(this.changeForm.value).subscribe({
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
      this.changeForm.markAllAsTouched()
    }
   }


}
