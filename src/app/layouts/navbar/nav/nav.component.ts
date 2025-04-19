import { Component, inject, input, InputSignal, OnDestroy, OnInit, signal, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/authentication/auth.service';
import { CartService } from '../../../core/services/cart/cart.service';
import { Subscription } from 'rxjs';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit,OnDestroy{
  private readonly _Router=inject(Router)
  private readonly _AuthService=inject(AuthService)
  private readonly _CartService =inject(CartService)
  private readonly _WishlistService =inject(WishlistService)
  private readonly _PLATFORM_ID=inject(PLATFORM_ID)
  navCartCount!:number;
  wishlistcount!:number;
  check:InputSignal<boolean>=input(true);
  cancel!:Subscription
  
  ngOnInit(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      
    
    if (sessionStorage) {
      this._CartService.GetLoggedUserCart().subscribe({
        next:(res)=>{
          this.navCartCount=res.numOfCartItems
        }
      });
      this._WishlistService.wishlistCount.subscribe({
        next:(res)=>{
          this.wishlistcount=res;
          console.log("the new response in navbar",res);
          
          
        }
      })
    }
     this.cancel= this._CartService.CartCount.subscribe({
        next:(value)=>{
          this.navCartCount=value;
        }
        
      });
      this._WishlistService.getLoggedUserWishlist().subscribe({
        next:(res)=>{
          this.wishlistcount=res.count;
          console.log(this.wishlistcount);
          
        },
        error:(err)=>{
          console.log(err
          );
          
        }
        
      })
    }
    
  }
ngOnDestroy(): void {
    this.cancel?.unsubscribe()
}

  logOut(){
    sessionStorage.removeItem('token');
    this._Router.navigate(['/login'])
    this._AuthService.userInfo=null
  }
  

}
