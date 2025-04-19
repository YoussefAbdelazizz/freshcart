import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  userToken!:any
  // CartCount:number=0;
  CartCount:BehaviorSubject<number>=new BehaviorSubject(0);
  constructor(private _HttpClient:HttpClient,@Inject(PLATFORM_ID) private _PLATFORM_ID:any) {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.userToken={token: sessionStorage.getItem('token')}
      
    }else{
      this.userToken={}
    }


   }
  GetLoggedUserCart():Observable<any>{

    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/cart')

  }
  AddProductToCart(p_id:string):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/cart',{
      "productId": p_id})
  }
  DeleteCartItem(p_id:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${p_id}`)
  }
  UpdateCartProductQuantity(p_id:string,num:number):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${p_id}`,{"count": num})
  }
  ClearCart():Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`)
  }
}
