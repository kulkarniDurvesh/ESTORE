import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule,HttpTestingController,TestRequest} from '@angular/common/http/testing'
import { CartStoreItem } from '../cart/cart.storeItem';
import { CartStoreItemMock } from 'src/app/shared/mocks/cart.storeItem.mocks';
import { OrderService } from './order.service';
import { UserService } from '../users/user-service';
import { UserServiceMock } from 'src/app/shared/mocks/user-service.service.mocks';
import { DeliveryAddress } from '../../types/cart.types';

describe('OrderService', () => {
  let service: OrderService;
  let httptestingControllers:HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[
        OrderService,
        {provide:CartStoreItem,useClass:CartStoreItemMock},
        {provide:UserService,useClass:UserServiceMock}
      ]
    });
    service = TestBed.inject(OrderService);
    httptestingControllers = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call post query on save orders',()=>{
    const deliveryAddress:DeliveryAddress={
      address:'Street 1',
      city:'NY',
      pin:'12345',
      state:'NJ',
      userName:'TestUser'
    };

    const userEmail:string='abc@testmail.com';
    service.saveOrder(deliveryAddress,userEmail).subscribe();
    const request:TestRequest = httptestingControllers.
      expectOne((req)=>req.url===`http://localhost:5001/orders/add`);
    expect(request.request.method).toBe('POST');
    expect(request.request.headers.keys()).toEqual(['authorization']);
    expect(request.request.headers.get('authorization')).toEqual('token123');
  });

  it('should perform get request for getOrders',()=>{
    const useremail:string='abs@testmail.com';
    service.getOrders(useremail).subscribe();
    const request:TestRequest = httptestingControllers.expectOne(
      (req)=>req.url===`http://localhost:5001/orders/allOrders?userEmail=${useremail}`
    );
    expect(request.request.method).toBe("GET");
    expect(request.request.headers.keys()).toEqual(['authorization']);
    expect(request.request.headers.get('authorization')).toEqual('token123');
  });

  it('should perform get request fro getOrderProducts',()=>{
    service.getOrderProducts(1).subscribe();
    const request:TestRequest = httptestingControllers.expectOne(
      (req)=>req.url==='http://localhost:5001/orders/orderproducts?orderId=1'
    );
    expect(request.request.method).toBe("GET");
    expect(request.request.headers.keys()).toEqual(['authorization']);
    expect(request.request.headers.get('authorization')).toEqual('token123');

  })


});
