import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { Router, NavigationEnd } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
//import { CategoriesStoreItem } from './services/categories-store-item.service';
//import { ProductStoreItem } from './services/product-store-item.service';
import { Subject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { filter } from 'rxjs/operators';
import { CategoriesStoreItem } from './services/category/categories.storeItem';
import { ProductStoreItem } from './services/products/products.storeItem';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let router: Router;
  let routerEventsSubject: Subject<any>;
  let categoryStoreItemSpy: jasmine.SpyObj<CategoriesStoreItem>;
  let productStoreItemSpy: jasmine.SpyObj<ProductStoreItem>;

  beforeEach(() => {
    // Create spy objects for the services
    categoryStoreItemSpy = jasmine.createSpyObj('CategoriesStoreItem', ['loadCategories']);
    productStoreItemSpy = jasmine.createSpyObj('ProductStoreItem', ['loadProducts']);

    // Create the spy subject for router events
    routerEventsSubject = new Subject<any>();

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HomeComponent],
      providers: [
        { provide: CategoriesStoreItem, useValue: categoryStoreItemSpy },
        { provide: ProductStoreItem, useValue: productStoreItemSpy },
        {
          provide: Router,
          useValue: {
            events: routerEventsSubject.asObservable(), // Mock router events
            navigate: jasmine.createSpy('navigate')    // Mock navigate method
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignore unknown elements like <router-outlet>
    });

    router = TestBed.inject(Router);
    component = TestBed.createComponent(HomeComponent).componentInstance;
  });

  it('should call loadCategories and loadProducts in the constructor', () => {
    expect(categoryStoreItemSpy.loadCategories).toHaveBeenCalled();
    expect(productStoreItemSpy.loadProducts).toHaveBeenCalled();
  });

  it('should navigate to /home/products when navigation to /home occurs', fakeAsync(() => {
    // Spy on the router.navigate method
    //spyOn(router, 'navigate');
    
    // Trigger change detection to initialize the component
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();

    // Simulate the NavigationEnd event with the /home URL
    const navigationEndEvent = new NavigationEnd(1, '/home', '/home');
    routerEventsSubject.next(navigationEndEvent); // Emit the event using the Subject

    // Simulate passage of async time
    tick();

    // Verify that router.navigate was called with the expected URL
    expect(router.navigate).toHaveBeenCalledWith(['/home/products']);
  }));



  it('should load product on select of category',()=>{
    const mainCategoryId = 123;

    // Spy on the loadProducts method of the productStoreitem
    //spyOn(component.productStoreitem, 'loadProducts');
  
    // Call the onSelectCategory method
    component.onSelectCategory(mainCategoryId);
  
    // Expect loadProducts to have been called with the correct query parameter
    expect(component.productStoreitem.loadProducts).toHaveBeenCalledWith('maincategoryid=' + mainCategoryId);
  });

  it('should load product on search keyword',()=>{
    const searchKeyword={
      categoryId:123,
      keyword:"abc"
    }
    //spyOn(component.productStoreitem, 'loadProducts');

    component.onSearchKeyword(searchKeyword);

    // Assert that loadProducts was called with the correct parameter
    expect(component.productStoreitem.loadProducts).toHaveBeenCalledWith('maincategoryid=' + searchKeyword.categoryId + '&keyword=' + searchKeyword.keyword);
  });
});
