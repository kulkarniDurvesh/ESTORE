import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { ProductStoreItem } from '../../services/products/products.storeItem';
import { ProductStoreItemMock } from 'src/app/shared/mocks/products.storeItem.mocks';
import { CartStoreItem } from '../../services/cart/cart.storeItem';
import { CartStoreItemMock } from 'src/app/shared/mocks/cart.storeItem.mocks';
import { Product } from '../../types/product.types';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let cartStoreItem:CartStoreItem;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      providers:[{provide:ProductStoreItem,useClass:ProductStoreItemMock},
        {provide:CartStoreItem,useClass:CartStoreItemMock}
      ]
    });
    //UseClass property indicates that when actual provider class is needed,use mock class instead
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    cartStoreItem = TestBed.inject(CartStoreItem)
    //here when the instance is extracted to the variable the instance belongs to the mock class instead
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('addToCart', () => { 
    it("should call add product function in cart store item",()=>{
      const spyAddProduct:jasmine.Spy = spyOn(cartStoreItem,'addProduct');
      const product:Product={
        CATEGORY_ID:1,
        ID:1,
        PRICE:10,
        PRODUCT_DESCRIPTION:'desciption',
        PRODUCT_IMG:"Img",
        PRODUCT_NAME:'Test Product',
        ratings:4
      }

      component.addToCart(product);
      expect(spyAddProduct).toHaveBeenCalledWith(product);
    })
   })
});
