import { Router } from '@angular/router';
import { AuthService } from './../../core/services/authentication/auth.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  errText!:string|null
  resText!:string|null
  private readonly _AuthService=inject(AuthService)
 private readonly _Router=inject(Router)
  resetPassword:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{7,}$/)])
  })
  ChangePassword(){
    
    this._AuthService.ResetPassword(this.resetPassword.value).subscribe({
      next:(res)=>{
        console.log(res.token);
        this.errText=null
        
        
        this._Router.navigate(["/login"])

      },
      error:(err)=>{
        console.log(err);
        this.errText=err.error.message
      }
    })
  }


}
