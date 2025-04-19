import { Component } from '@angular/core';
import { SearchpipePipe } from '../../shared/pipes/search/searchpipe.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ICategory } from '../../core/interfaces/categories/icategory';
import { IProduct } from '../../core/interfaces/products/iproduct';
import { Subscription } from 'rxjs';
import { CartService } from '../../core/services/cart/cart.service';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ProductService } from '../../core/services/products/product.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
@Component({
  selector: 'app-products',
  imports: [SearchpipePipe,FormsModule,RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  searchValue:string='';
  catergoriesData!:ICategory[]
    productsData!:IProduct[]
    wishlistProducts!:string[];
  wishlistno!:number;
  productsSub!:Subscription;
  CategoriesSub!:Subscription;

  constructor(private _ProductService:ProductService,private _CategoriesService:CategoriesService,private _CartService:CartService,private toastr: ToastrService,private _WishlistService:WishlistService){}
  ngOnInit(): void {

     
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
    addProductToWishlist(p_id:string){
      this._WishlistService.AddProductToWishlist(p_id).subscribe({
        next:(res)=>{
          console.log(res.data);
          this.wishlistProducts=res.data;
          this.toastr.success(res.message,"FreshCart")
          
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
