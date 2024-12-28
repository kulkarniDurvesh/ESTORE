import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderService } from '../../services/order/order.service';
import { OrderServiceMock } from 'src/app/shared/mocks/order-service.service.mocks';
import { UserService } from '../../services/users/user-service';
import { UserServiceMock } from 'src/app/shared/mocks/user-service.service.mocks';
import { PastordersComponent } from './pastorders.component';
import { of } from 'rxjs';

describe('PastordersComponent', () => {
  let component: PastordersComponent;
  let fixture: ComponentFixture<PastordersComponent>;
  let orderService:OrderService;
  let userService:UserService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PastordersComponent],
      providers:[
        {provide:OrderService,useClass:OrderServiceMock},
        {provide:UserService,useClass:UserServiceMock}
      ]
    });
    fixture = TestBed.createComponent(PastordersComponent);
    component = fixture.componentInstance;
    orderService = TestBed.inject(OrderService);
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call select order on changing or selecting order',()=>{
    const pastOrder = {
      userName:"Durvesh",
      address:"123 london street",
      city:"London",
      state:"London",
      pin:"123123",
      total:123,
      orderDate:"2024-01-01",
      orderId:123,
    };

    component.pastOrders = [pastOrder];
    spyOn(component,'getOrderProducts');

      // Simulate an event object
    const mockEvent = {
      target: {
        value: String(pastOrder.orderId), // Simulate the dropdown selection value
      },
    };
    component.selectOrder(mockEvent);
    expect(component.getOrderProducts).toHaveBeenCalledWith(pastOrder.orderId);
  });
  
  it('should return empty pastOrder product array',()=>{
    const pastOrder = {
      userName:"Durvesh",
      address:"123 london street",
      city:"London",
      state:"London",
      pin:"123123",
      total:123,
      orderDate:"",
      orderId:0,
    };
    const mockEvent = {
      target: {
        value: String(pastOrder.orderId), // Simulate the dropdown selection value
      },
    };

    component.pastOrders = [pastOrder];
    spyOn(component,'getOrderProducts');

    component.selectOrder(mockEvent);
    expect(component.pastOrder).toBeUndefined();
    expect(component.pastOrderProduct).toEqual([]);
  });


  it('should fetch and assign products to pastorderProduct',()=>{
    const mockProducts =[
      {productId:1,
        productImage:"abc",
        qty:23,
        price:123,
        amount:123,
        productName:"abc"}
    ];

    const mockOrderId = 123;
    spyOn(component['orderService'],'getOrderProducts').and.returnValue(of(mockProducts));

    component.getOrderProducts(mockOrderId);
     // Assert that the service was called with the correct parameter
    expect(component['orderService'].getOrderProducts).toHaveBeenCalledWith(mockOrderId);

    // Assert that the products were assigned to pastOrderProduct
    expect(component.pastOrderProduct).toEqual(mockProducts);


  });

});
