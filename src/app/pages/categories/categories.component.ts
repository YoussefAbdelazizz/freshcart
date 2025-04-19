import { CartService } from './../../core/services/cart/cart.service';
import { ProductService } from './../../core/services/products/product.service';

import { ICategory } from '../../core/interfaces/categories/icategory';
import { CategoriesService } from './../../core/services/categories/categories.service';
import { Component, inject, OnInit } from '@angular/core';
import { IProduct } from '../../core/interfaces/products/iproduct';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  catergoriesData!:ICategory[];
  categoryProducts!:IProduct[];
  WantedCategory!:string;
  NoOfProducts!:number
  private readonly _CategoriesService=inject(CategoriesService);
  private readonly _ProductService=inject(ProductService)
  private readonly _CartService=inject(CartService)
  private readonly _ToastrService=inject(ToastrService)
  ngOnInit(): void {
      
  
    this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        
        this.catergoriesData=res.data;
        console.log(this.catergoriesData);
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
    
  }
  getCategoryProducts(c_id:string){
    this._ProductService.getCategoryProducts(c_id).subscribe({
      next:(res)=>{
        this.NoOfProducts=0;
        this.categoryProducts=res.data;
        console.log(this.categoryProducts);
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
