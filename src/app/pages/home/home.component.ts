import { OwlOptions } from 'ngx-owl-carousel-o';
import { Category, IProduct } from './../../core/interfaces/products/iproduct';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/products/product.service';

import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../core/interfaces/categories/icategory';
import { CarouselModule } from 'ngx-owl-carousel-o'
import { SearchpipePipe } from '../../shared/pipes/search/searchpipe.pipe';
import {FormsModule} from '@angular/forms'
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/authentication/auth.service';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { stringify } from 'querystring';


@Component({
  selector: 'app-home',
  imports: [CarouselModule,SearchpipePipe,FormsModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})


export class HomeComponent implements OnInit,OnDestroy {
  searchValue:string='';
  wishlistProducts!:string[];
  wishlistno!:number;
  mainoptionsOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplayTimeout:2000,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: { items: 1 },
    
    },
    nav: true
  };
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplayTimeout:2000,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 4 }
    },
    nav: true
  };
  
  catergoriesData!:ICategory[]
  productsData!:IProduct[]
  
productsSub!:Subscription;
CategoriesSub!:Subscription;
private readonly _AuthService=inject(AuthService)
  constructor(private _ProductService:ProductService,private _CategoriesService:CategoriesService,private _CartService:CartService,private toastr: ToastrService,private _WishlistService:WishlistService){

  }
  
  
  ngOnInit(): void {
    console.log(this._AuthService.userInfo);
     
    this.productsSub = this._ProductService.getAllProducts().subscribe({
      next:(res)=>{
        // console.log(res);
        console.log(res.data);
        this.productsData = res.data
        

      },
      error:(err)=>{
        console.log(err);
        
      },
      complete:()=>{

      }
    }
    
    )  
    this.CategoriesSub=this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.catergoriesData=res.data
        

      },
      error:(err)=>{
        console.log(err);
        
      },
      complete:()=>{

      }
    }
    )
    this._WishlistService.getLoggedUserWishlist().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.wishlistno=res.count;
        this.wishlistProducts=res.data.map((product:IProduct) =>product._id) 
        this._WishlistService.wishlistCount.next(res.count);

        
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



  ngOnDestroy(): void {
    this.productsSub.unsubscribe();
    this.CategoriesSub.unsubscribe();
}
addProductToWishlist(p_id:string){
  this._WishlistService.AddProductToWishlist(p_id).subscribe({
    next:(res)=>{
      console.log(res.data.length);
      this.wishlistProducts=res.data;
      this.toastr.success(res.message,"FreshCart")
      this._WishlistService.wishlistCount.next(res.data.length);
      
    },
    error:(err)=>{
      console.log(err);
      this.toastr.error('There was an error while handling your request');
      
    }
  })
}
deleteProductFromWishlist(p_id:string){
  this._WishlistService.RemoveItemFromWishlist(p_id).subscribe({
    next:(res)=>{
      console.log(res);
      this.wishlistProducts=res.data;
      this.toastr.success(res.message);
      this._WishlistService.wishlistCount.next(res.data.length)
      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}

}

