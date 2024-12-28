import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartStoreItem } from '../../services/cart/cart.storeItem';
import { CartStoreItemMock } from 'src/app/shared/mocks/cart.storeItem.mocks';
import { ProductdetailsComponent } from './productdetails.component';
import { ProductsService } from '../../services/products/products.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductServiceMock } from 'src/app/shared/mocks/product-service.mocks';
import { RatingsComponent } from 'src/app/shared/components/ratings/ratings.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('ProductdetailsComponent', () => {
  let component: ProductdetailsComponent;
  let fixture: ComponentFixture<ProductdetailsComponent>;
  let cartStoreItem:CartStoreItem;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductdetailsComponent,RatingsComponent],
      providers:[
        {provide:CartStoreItem,useClass:CartStoreItemMock},
        {provide:ProductsService,useClass:ProductServiceMock}
      ],
      imports:[RouterTestingModule,FontAwesomeModule]
    });
    fixture = TestBed.createComponent(ProductdetailsComponent);
    component = fixture.componentInstance;
    cartStoreItem = TestBed.inject(CartStoreItem);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
