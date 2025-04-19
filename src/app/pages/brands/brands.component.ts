import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { ICategory } from '../../core/interfaces/categories/icategory';
import { IProduct } from '../../core/interfaces/products/iproduct';
import { ProductService } from '../../core/services/products/product.service';
import { BrandsService } from './../../core/services/brands/brands.service';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-brands',
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
BrandData!:ICategory[]
NoOfProducts!:number
brandProducts!:IProduct[]
 private readonly _BrandsService=inject(BrandsService)
 private readonly _ProductService=inject(ProductService)
 private readonly _CartService=inject(CartService)
 private readonly _ToastrService=inject(ToastrService)
  ngOnInit(): void {
      this._BrandsService.getAllBrands().subscribe({
        next:(res)=>{
          
          this.BrandData=res.data;
          console.log(this.BrandData);
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
  }
  getBrandProducts(b_id:string){
    this._ProductService.getBrandProducts(b_id).subscribe({
      next:(res)=>{
        this.NoOfProducts=0;
        this.brandProducts=res.data;
        console.log(this.brandProducts);
        this.NoOfProducts=res.data.length;
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
        this._ToastrService.success(res.message,"FreshCart")
        
      },
      error:(err)=>{
        console.log(err);
        this._ToastrService.error('There was an error while handling your request')
        
      }
    })
  }
}
