import { EmailValidator, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/authentication/auth.service';
import { Component, inject } from '@angular/core';
import { error } from 'console';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-Password.scss'
})
export class ForgotPasswordComponent {
   successText!:string|null
   errText!:string|null
   private readonly _AuthService=inject(AuthService)
   private readonly _Router=inject(Router)
   resetpassword:FormGroup=new FormGroup({
    email:new FormControl(null,Validators.email)
   })
   resetPassword(){
  this._AuthService.forgotPassword(this.resetpassword.value).subscribe({
    next:(res)=>{
      console.log(res);
      this.successText=res.message;
      this.errText=null;
      this._Router.navigate(["/verify-reset-code"])
      
    },
    error:(err)=>{
      console.log(err);
      this.errText=err.error.message;
      this.successText=null;
      console.log(this.errText);
    }
    })
    
   }

}
