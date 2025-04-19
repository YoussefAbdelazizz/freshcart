
import { Component, inject } from '@angular/core';
import { FormControl,FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/authentication/auth.service';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly _AuthService= inject(AuthService);
  private readonly _Router= inject(Router);

  loading:boolean=false
  errText!:string;
  successText!:string;
  loginForm:FormGroup = new FormGroup({
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{7,}$/)]),

  })

  showForm():void{
    if (this.loginForm.valid) {
      this.loading=true
      console.log(this.loginForm.value);
    this._AuthService.signIn(this.loginForm.value).subscribe({
      next:(res)=>{
        this.loading=false
        console.log(res);
        this.successText=res.message
        this.errText=""
        sessionStorage.setItem('token',res.token)
        this._AuthService.tokenDecode();
        this._Router.navigate(["/home"])

        
      },
      error:(err)=>{
        this.loading=false
        console.log(err);
        this.errText=err.error.message;
        this.successText=''
      }
    }
    )
    }
    
    
  }
}
