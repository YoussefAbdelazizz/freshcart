import { AuthService } from './../../core/services/authentication/auth.service';
import { subscribe } from 'node:diagnostics_channel';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-reset-code',
  imports: [ReactiveFormsModule],
  templateUrl: './verify-reset-code.component.html',
  styleUrl: './verify-reset-code.component.scss'
})
export class VerifyResetCodeComponent {
  
  resError:any
 private readonly _AuthService=inject(AuthService)
 private readonly _Router=inject(Router)
  resetform:FormGroup=new FormGroup({
    resetCode:new FormControl(null,[Validators.required,Validators.minLength(6),Validators.maxLength(6)])
  })
  verifyCode(){
    console.log(this.resetform.value);
    
    this._AuthService.VerifyResetCode(this.resetform.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.resError=null;
        this._Router.navigate(['/reset-password'])
        
      },
      error:(err)=> {
         this.resError="Reset code is invalid or has expired";
      },
    })
    
  }
}
