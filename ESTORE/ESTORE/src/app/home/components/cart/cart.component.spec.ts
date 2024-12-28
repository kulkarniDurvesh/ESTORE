import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartStoreItem } from '../../services/cart/cart.storeItem';
import { CartStoreItemMock } from 'src/app/shared/mocks/cart.storeItem.mocks';
import { CartComponent } from './cart.component';
import { UserService } from '../../services/users/user-service';
import { UserServiceMock } from 'src/app/shared/mocks/user-service.service.mocks';
import { OrderService } from '../../services/order/order.service';
import { OrderServiceMock } from 'src/app/shared/mocks/order-service.service.mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { CartItem } from '../../types/cart.types';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let userService: UserService;
  let orderService: OrderService;
  let cartStoreItem: CartStoreItem;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [
        { provide: CartStoreItem, useClass: CartStoreItemMock },
        { provide: UserService, useClass: UserServiceMock },
        { provide: OrderService, useClass: OrderServiceMock },
      ],
      imports: [RouterTestingModule, ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    cartStoreItem = TestBed.inject(CartStoreItem);
    orderService = TestBed.inject(OrderService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with user details on ngOnInit', () => {
    const mockUser = { 
      firstName:'Tom',
      email:'test@gmail.com', 
      lastName: '',
      address: '',
      city: '',
      state: '',
      pin: '' };
    spyOnProperty(userService, 'loggedInUser', 'get').and.returnValue(mockUser); // Spy on the getter
    component.ngOnInit();  // Call ngOnInit where loggedInUser is used
    expect(component.orderForm.get('name')?.value).toBe('Tom ');
    //expect(component.orderForm.get('email')?.value).toBe('test@gmail.com');
  });

  it('should navigate to home when navigateToHome is called', () => {
    const routerSpy = spyOn(component.router, 'navigate');
    component.navigateToHome();
    expect(routerSpy).toHaveBeenCalledWith(['home/products']);
  });

  it('should add product to cart when updateQuantity is called with "+"', () => {
    const cartItem: CartItem = {
      product: {
        CATEGORY_ID: 1,
        ID: 1,
        PRICE: 100,
        PRODUCT_DESCRIPTION: 'Test Product',
        PRODUCT_IMG: 'test',
        PRODUCT_NAME: 'Test Product',
        ratings: 4,
      },
      quantity: 1,
      amount: 100,
    };
    const event = { target: { innerText: '+' } };
    const addProductSpy = spyOn(cartStoreItem, 'addProduct');
    component.updateQuantity(event, cartItem);
    expect(addProductSpy).toHaveBeenCalledWith(cartItem.product);
  });

  it('should decrease product quantity when updateQuantity is called with "-"', () => {
    const cartItem: CartItem = {
      product: {
        CATEGORY_ID: 1,
        ID: 1,
        PRICE: 100,
        PRODUCT_DESCRIPTION: 'Test Product',
        PRODUCT_IMG: 'test',
        PRODUCT_NAME: 'Test Product',
        ratings: 4,
      },
      quantity: 1,
      amount: 100,
    };
    const event = { target: { innerText: '-' } };
    const decreaseProductSpy = spyOn(cartStoreItem, 'decreaseProductQuantity');
    component.updateQuantity(event, cartItem);
    expect(decreaseProductSpy).toHaveBeenCalledWith(cartItem);
  });

  it('should remove product from the cart when removeItem is called', () => {
    const cartItem: CartItem = {
      product: {
        CATEGORY_ID: 1,
        ID: 1,
        PRICE: 100,
        PRODUCT_DESCRIPTION: 'Test Product',
        PRODUCT_IMG: 'test',
        PRODUCT_NAME: 'Test Product',
        ratings: 4,
      },
      quantity: 1,
      amount: 100,
    };
    const removeProductSpy = spyOn(cartStoreItem, 'removeProduct');
    component.removeItem(cartItem);
    expect(removeProductSpy).toHaveBeenCalledWith(cartItem);
  });

  it('should clear cart and show success message on successful order submission', () => {
    spyOnProperty(userService, 'isUserAuthenticated', 'get').and.returnValue(true);

    spyOn(orderService, 'saveOrder').and.returnValue(of({ message: 'Order saved successfully', orderId: 123  }));
    const clearCartSpy = spyOn(cartStoreItem, 'clearCart');

    component.onSubmit();

    expect(clearCartSpy).toHaveBeenCalled();
    expect(component.alertType).toBe(0);
    expect(component.alertMessage).toBe('Order registered successfully !');
    expect(component.disableCheckout).toBeTrue();
  });

  it('should show error message when order submission fails', () => {
    spyOn(orderService, 'saveOrder').and.returnValue(
      throwError({ error: { message: 'Error occurred' } })
    );

    component.onSubmit();

    expect(component.alertType).toBe(2);
    expect(component.alertMessage).toBe('Please log in to register your Order');
  });

  it('should prompt login if user is not authenticated during order submission', () => {
    // Mock isUserAuthenticated to return false (simulate unauthenticated user)
    spyOnProperty(userService, 'isUserAuthenticated', 'get').and.returnValue(false);
    
    // Call the onSubmit method (assuming it checks the authentication state)
    component.onSubmit();
  
    // Assuming the component shows an alert when the user is unauthenticated
    expect(component.alertType).toBe(1); // Example: 1 could represent a login prompt type
    expect(component.alertMessage).toBe('Please log in to register your Order'); // Expected message
  });
  

  it('should unsubscribe from subscriptions on ngOnDestroy', () => {
    const unsubscribeSpy = spyOn(component.subscriptions, 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
