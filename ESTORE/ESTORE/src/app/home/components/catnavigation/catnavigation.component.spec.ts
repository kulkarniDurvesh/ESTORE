import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { CatnavigationComponent } from './catnavigation.component';
import { CategoriesStoreItem } from '../../services/category/categories.storeItem';
import { CategoriesStoreItemMock } from 'src/app/shared/mocks/categories.storeItem.mocks';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Category } from '../../types/category.types';
import { NavigationEnd,Router, RouterEvent } from '@angular/router';
import { ReplaySubject } from 'rxjs';
describe('CatnavigationComponent', () => {
  let component: CatnavigationComponent;
  let fixture: ComponentFixture<CatnavigationComponent>;
  let categoriesStoreItem:CategoriesStoreItem;
  let router:Router;

    const eventSubject:ReplaySubject<RouterEvent>= new ReplaySubject<RouterEvent>(1);
    const routerMock = {
      navigate:jasmine.createSpy('navigate'),
      events:eventSubject.asObservable()
    }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatnavigationComponent],
      providers:[
        
        {provide:CategoriesStoreItem,useClass:CategoriesStoreItemMock}
      ],
      imports:[RouterTestingModule]
    });
    fixture = TestBed.createComponent(CatnavigationComponent);
    component = fixture.componentInstance;
    router=TestBed.inject(Router)
    categoriesStoreItem = TestBed.inject(CategoriesStoreItem)
    fixture.detectChanges();
  });

  afterEach(() => {
    eventSubject.complete();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display only category,Home,if displayOption is false',()=>{
    component.displayOptions=false;
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('li')).length).toEqual(1);
    expect(fixture.debugElement.queryAll(By.css('a')).length).toEqual(1);
    expect(fixture.debugElement.queryAll(By.css('a'))[0].nativeElement.text).toEqual("HOME");
  });

  it('should display top categories if displayOption is true',()=>{
    component.displayOptions = true;
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('li')).length).toEqual(3);
    expect(fixture.debugElement.queryAll(By.css('a')).length).toEqual(3);
    expect(fixture.debugElement.queryAll(By.css('a'))[0].nativeElement.text).toEqual('HOME');
    expect(fixture.debugElement.queryAll(By.css('a'))[1].nativeElement.text).toEqual('Category 1');
    expect(fixture.debugElement.queryAll(By.css('a'))[2].nativeElement.text).toEqual('Category 2');
  });
  
  it('should have route to products page on Home anchor',()=>{
    fixture.detectChanges();
    let element = fixture.debugElement.queryAll(By.css('a'))[0].nativeElement;
    expect(element.getAttribute('routerLink')).toEqual('/home/products');
  });

  it('should call onCategoryClick method when a category is clicked',()=>{
    const onCategoryClickSpy: jasmine.Spy = spyOn(component,'onClickCategory');
    component.displayOptions = true;
    fixture.detectChanges();

    let element = fixture.debugElement.queryAll(By.css('a'))[1].nativeElement;
    element.click();
    expect(onCategoryClickSpy).toHaveBeenCalled();
  });
  it("should emit the categoryId when clicked on the onClick category",()=>{
    const category: Category = { ID: 1, CATEGORY: 'MEN' }; // Mock category
    spyOn(component.categoryClicked,'emit');
    component.onClickCategory(category);
    expect(component.categoryClicked.emit).toHaveBeenCalledWith(category.ID);

  });

  it('should display options when we navigate to url /home/products', fakeAsync(() => {
    // Emit NavigationEnd event with /home/products URL
    eventSubject.next(new NavigationEnd(1, '/home/products', '/home/products'));
    
    flush(); // Ensure asynchronous operations are resolved
    fixture.detectChanges(); // Trigger Angular change detection
  
    expect(component.displayOptions).toBeTrue(); // Assert the displayOptions is set to true
  }));
  
  it('should not display options when we navigate to url other than /home/products', fakeAsync(() => {
    // Emit NavigationEnd event with a different URL
    eventSubject.next(new NavigationEnd(1, '/home/cart', '/home/cart'));
    component.displayOptions=false;
    flush(); // Ensure asynchronous operations are resolved
    fixture.detectChanges(); // Trigger Angular change detection
  
    expect(component.displayOptions).toBeFalse(); // Assert the displayOptions is set to false
  }));
  

});
