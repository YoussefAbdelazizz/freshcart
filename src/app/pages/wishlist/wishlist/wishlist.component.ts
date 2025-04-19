import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { IProduct } from '../../../core/interfaces/products/iproduct';
import { Toast, ToastrService } from 'ngx-toastr';
import { CartService } from '../../../core/services/cart/cart.service';

@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit{
  wishlistProducts!:IProduct[];
 constructor(private _WishlistService:WishlistService,private toastr:ToastrService,private _CartService:CartService){}

 getloggedusercart(){
  return this._WishlistService.getLoggedUserWishlist().subscribe({
    next:(res)=>{
      console.log(res);
      this.wishlistProducts=res.data;
      console.log(this.wishlistProducts);
      
    }
   })
}
 ngOnInit(): void {
     this.getloggedusercart()
 }



 deleteProductFromWishlist(p_id:string){
  this._WishlistService.RemoveItemFromWishlist(p_id).subscribe({
    next:(res)=>{
      console.log(res);
      this.wishlistProducts=res;
      this.toastr.success(res.message);
      this._WishlistService.wishlistCount.next(res.data.length)
      this.getloggedusercart();
      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}
AddToCart(p_id:string):void{
  this._CartService.AddProductToCart(p_id).subscribe({
    next:(res)=>{
      console.log(res);
      this._CartService.CartCount.next(res.numOfCartItems);
      this.toastr.success(res.message,"FreshCart")
      
    },
    error:(err)=>{
      console.log(err);
      this.toastr.error('There was an error while handling your request')
      
    }
  })
}

}
