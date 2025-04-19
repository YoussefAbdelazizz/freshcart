import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { envirnoment } from '../../environment/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  userToken:any={token: sessionStorage.getItem('token')}

  constructor(private _HttpClient:HttpClient,@Inject(PLATFORM_ID) private _PLATFORM_ID:any) { 
     if (isPlatformBrowser(this._PLATFORM_ID)) {
    
          
        }else{
          this.userToken={}
        }
    
  }

CheckOutSession(cart_id:string,shippingaddress:object):Observable<any>{
  return this._HttpClient.post(`${envirnoment.baseurl}/orders/checkout-session/${cart_id}?url=${envirnoment.domain}`,{"shippingAddress": shippingaddress},{headers:this.userToken})
}
}