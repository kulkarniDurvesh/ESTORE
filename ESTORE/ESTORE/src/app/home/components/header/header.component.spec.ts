import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';
import { NavigationEnd,Router,RouterEvent } from '@angular/router';
import { UserService } from '../../services/users/user-service';
import { UserServiceMock } from 'src/app/shared/mocks/user-service.service.mocks';
import { CategoriesStoreItem } from '../../services/category/categories.storeItem';
import { CategoriesStoreItemMock } from 'src/app/shared/mocks/categories.storeItem.mocks';
import { CartStoreItem } from '../../services/cart/cart.storeItem';
import { CartStoreItemMock } from 'src/app/shared/mocks/cart.storeItem.mocks';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReplaySubject } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router:Router;

  const eventSubject:ReplaySubject<RouterEvent>= new ReplaySubject<RouterEvent>(1);
  const routerMock = {
    navigate:jasmine.createSpy('navigate'),
    events:eventSubject.asObservable()
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers:[
        {provide:UserService,useClass:UserServiceMock},
        {provide:CartStoreItem,useClass:CartStoreItemMock},
        {provide:CategoriesStoreItem,useClass:CategoriesStoreItemMock},
        {provide:Router,useValue:routerMock}
      ],
      imports:[ReactiveFormsModule,RouterTestingModule,FontAwesomeModule]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router=TestBed.inject(Router)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should naviget to cart on calling add to cart',()=>{
    component.navigateToCart();
    expect(router.navigate).toHaveBeenCalledWith(['home/cart'])
  });

  it('should display search bar if navigated to products',()=>{
    eventSubject.next(new NavigationEnd(1,'/home/products','/home/products'))
    expect(component.displaySearchBar).toBeTrue();
  })

  it('should not display the search bar if not navigated to products',()=>{
    eventSubject.next(new NavigationEnd(1,'/home/cart','/home/cart'));
    expect(component.displaySearchBar).toBeFalse();
  })

});
