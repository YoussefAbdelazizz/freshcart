import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { NavComponent } from "../../navbar/nav/nav.component";


@Component({
  selector: 'app-auth',
  imports: [RouterOutlet, NavComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
constructor(private _HttpClient:HttpClient){}
signUp(data:object):Observable<any>{
  return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,data)
}
}
