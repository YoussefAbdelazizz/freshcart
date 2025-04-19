import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { envirnoment } from '../../environment/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  userToken!:any
  wishlistCount:BehaviorSubject<number>=new BehaviorSubject(0);
  constructor(private _HttpClient:HttpClient,@Inject(PLATFORM_ID) private _PLATFORM_ID:any) { 
    if (isPlatformBrowser(this._PLATFORM_ID)) {
          this.userToken={token: sessionStorage.getItem('token')}
          
        }else{
          this.userToken={}
        }
    
    
       }
  

  
  AddProductToWishlist(p_id:string):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
      "productId": p_id})
  }
  getLoggedUserWishlist():Observable<any>{

    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/wishlist`)
  }
  RemoveItemFromWishlist(p_id:string):Observable<any>{

    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${p_id}`)
  }
}
