import { Component, OnDestroy, OnInit } from '@angular/core';
import { PastOrders,Pastproducts } from '../../types/order.types';
import { OrderService } from '../../services/order/order.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/users/user-service';
@Component({
  selector: 'app-pastorders',
  templateUrl: './pastorders.component.html',
  styleUrls: ['./pastorders.component.css']
})
export class PastordersComponent implements OnInit,OnDestroy{

  pastOrderProduct:Pastproducts[]=[];
  pastOrder:PastOrders;
  pastOrders:PastOrders[]=[];
  subscription:Subscription = new Subscription();

  constructor(private orderService:OrderService,private userService:UserService)
  {

  }
 

  
  ngOnInit(): void {
    this.subscription.add(
      
      this.orderService.getOrders(this.userService.loggedInUser.email).subscribe(pastorders=>{
        this.pastOrders = pastorders
      })
    )
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
  selectOrder(events:any):void{
    if(Number.parseInt(events.target.value)>0){
      this.pastOrder = this.pastOrders.filter((order)=>
        order.orderId = Number.parseInt(events.target.value)
      )[0];

      this.getOrderProducts(this.pastOrder.orderId);
    }else{
     this.pastOrder = <any>undefined 
     this.pastOrderProduct = [];
    }
  }

  getOrderProducts(orderId:number):void{
    this.subscription.add(
      this.orderService.getOrderProducts(orderId).subscribe((products)=>{
        this.pastOrderProduct = products
      })
    )
  }



}
