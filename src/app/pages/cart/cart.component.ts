import { CurrencyPipe } from '@angular/common';
import { Icart } from '../../core/interfaces/cart/icart';
import { CartService } from './../../core/services/cart/cart.service';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit
 {
  cartData!:Icart|null
  private readonly _CartService= inject(CartService)

  ngOnInit(): void {
      this._CartService.GetLoggedUserCart().subscribe({
        next:(res)=>{
          
          this.cartData=res.data
          console.log(this.cartData);
          
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
  }
  DeleteCartItem(p_id:string):void{
    this._CartService.DeleteCartItem(p_id).subscribe({
      next:(res)=>{
        console.log(res);
        this._CartService.CartCount.next(res.numOfCartItems);
        this.cartData=res.data
      },
      error:(err)=>{
        console.log(err);

        
      }
     
    })
  }
  UpdateCartProductQuantity(p_id:string,num:number):void{
   if (num>1) {
    this._CartService.UpdateCartProductQuantity(p_id,num).subscribe({
      next:(res)=>{
        console.log(res);
        this.cartData=res.data
       
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
    
   }
  }
  clearCart():void{
    this._CartService.ClearCart().subscribe({
      next:(res)=>{
        console.log(res);
        this.cartData=null;
        this._CartService.CartCount.next(res.numOfCartItems);
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
