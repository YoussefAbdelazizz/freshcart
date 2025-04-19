import { subscribe } from 'node:diagnostics_channel';
import { PaymentService } from './../../core/services/order/payment.service';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { privateDecrypt } from 'crypto';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  private readonly _ActivatedRoute=inject(ActivatedRoute);
  private readonly _PaymentService=inject(PaymentService)
  cartid!:any
  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(param)=>{
          this.cartid=param.get("c_id")
          console.log(this.cartid);
          

        }
      })
  }
  orderDetails:FormGroup=new FormGroup({
    details:new FormControl(null,Validators.required),
    phone:new FormControl(null,Validators.required),
    city:new FormControl(null,Validators.required),
  })

  detailsSubmit(){
    if(this.orderDetails.valid){
      this._PaymentService.CheckOutSession(this.cartid,this.orderDetails.value).subscribe({
        next:(res)=>{
          console.log(res);
          if (res.status=='success') {
            window.open(res.session.url,'_self')
          }
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
    }
    
  }

  }

