import { subscribe } from 'node:diagnostics_channel';

import { IProduct } from './../../core/interfaces/products/iproduct';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { log } from 'console';
import { ProductService } from '../../core/services/products/product.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart/cart.service';


@Component({
  selector: 'app-productdetails',
  imports: [CarouselModule],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.scss'
})

export class ProductdetailsComponent implements OnInit {
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
  constructor(private _ProductService:ProductService){}
  productid!:string;
  productDetails:IProduct = {} as IProduct;
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _CartService=inject(CartService);
  ngOnInit(): void {
     this._ActivatedRoute.paramMap.subscribe({
      next:(param)=>
        this.productid=param.get('p_id') !
   })

   this._ProductService.getSpecificProduct(this.productid).subscribe({
    next:(res)=>{
      console.log(res);
      this.productDetails=res.data;
      
    },
    error:(err)=>{
      console.log(err);
      
    }
   })
 }
 addProductToCart():void{
  this._CartService.AddProductToCart(this.productid).subscribe({
    next:(res)=>{
      console.log(res);
      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
 }
}

