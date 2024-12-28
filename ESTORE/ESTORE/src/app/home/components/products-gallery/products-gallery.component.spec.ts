import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductStoreItem } from '../../services/products/products.storeItem';
import { ProductStoreItemMock } from 'src/app/shared/mocks/products.storeItem.mocks';
import { ProductsGalleryComponent } from './products-gallery.component';
import { SidenavigationComponent } from '../sidenavigation/sidenavigation.component';
import { CategoriesStoreItem } from '../../services/category/categories.storeItem';
import { CategoriesStoreItemMock } from 'src/app/shared/mocks/categories.storeItem.mocks';
import { ProductsComponent } from '../products/products.component';
import { CartStoreItem } from '../../services/cart/cart.storeItem';
import { CartStoreItemMock } from 'src/app/shared/mocks/cart.storeItem.mocks';
describe('ProductsGalleryComponent', () => {
  let component: ProductsGalleryComponent;
  let fixture: ComponentFixture<ProductsGalleryComponent>;
  let productStoreItem:ProductStoreItem;
  let categoriesStoreItem:CategoriesStoreItem;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsGalleryComponent,SidenavigationComponent,ProductsComponent],
      providers:[
        {provide:ProductStoreItem,useClass:ProductStoreItemMock},
        {provide:CategoriesStoreItem,useClass:CategoriesStoreItemMock},
        {provide:CartStoreItem,useClass:CartStoreItemMock}
      ]
    });
    fixture = TestBed.createComponent(ProductsGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the onSelectSubCategory function with event as paramenter',()=>{
    //You should not spy on the same method you're trying to test. 
    // Instead, focus on spying on the dependent method 
    // (productStoreitem.loadProducts) to verify the logic of 
    // onSelectSubCategory

    const mockEvent = 123; // Mock event
    spyOn(component['productStoreitem'], 'loadProducts'); // Spy on the dependency

    // Call the method
    component.onSelectSubCategory(mockEvent);

    // Assert that the dependency was called with the correct argument
    expect(component['productStoreitem'].loadProducts).toHaveBeenCalledWith('subcategoryid=' + mockEvent);
  });

});
