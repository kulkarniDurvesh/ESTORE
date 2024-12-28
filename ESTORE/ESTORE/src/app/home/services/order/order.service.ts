import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartStoreItem } from '../cart/cart.storeItem';
import { Order,OrderItem } from '../../types/order.types';
import { DeliveryAddress } from '../../types/cart.types';
import { UserService } from '../users/user-service';
import { PastOrders,Pastproducts } from '../../types/order.types';

@Injectable()
export class OrderService {

  constructor(private http:HttpClient,private cartStore:CartStoreItem,private userService:UserService) 
  {

  }


  saveOrder(deliveryAddress:DeliveryAddress,userEmail:string):Observable<any>
  {
    const url = `http://localhost:5001/orders/add`;
    const orderDetails:OrderItem[]=[];
    this.cartStore.cart.products.forEach(product=>{
        const orderItem:OrderItem={
          productId: product.product.ID,
          qty:product.quantity,
          amount:product.amount,
          price:product.product.PRICE
        }

        orderDetails.push(orderItem);
    });
    const order:Order={
      userName:deliveryAddress.userName,
      address:deliveryAddress.address,
      city:deliveryAddress.city,
      state:deliveryAddress.state,
      pin:deliveryAddress.pin,
      total:this.cartStore.cart.totalAmount,
      userEmail:userEmail,
      orderDetails:orderDetails
    }

    return this.http.post(url,order,{
      headers: {authorization:this.userService.token},
    })
  }

  getOrders(userEmail:string):Observable<PastOrders[]>{
    const url = `http://localhost:5001/orders/allOrders?userEmail=${userEmail}`;
    return this.http.get<PastOrders[]>(url,{
      headers:{authorization:this.userService.token}
    });
  }

  getOrderProducts(orderId:number):Observable<Pastproducts[]>{
    const url = `http://localhost:5001/orders/orderproducts?orderId=${orderId}`;

    return this.http.get<Pastproducts[]>(url,{
      headers:{authorization:this.userService.token}
    })
  }

}
