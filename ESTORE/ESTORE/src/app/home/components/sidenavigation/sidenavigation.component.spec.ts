import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriesStoreItem } from '../../services/category/categories.storeItem';
import { CategoriesStoreItemMock } from 'src/app/shared/mocks/categories.storeItem.mocks';
import { SidenavigationComponent } from './sidenavigation.component';

describe('SidenavigationComponent', () => {
  let component: SidenavigationComponent;
  let fixture: ComponentFixture<SidenavigationComponent>;
  let categoriesStoreItem:CategoriesStoreItem;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidenavigationComponent],
      providers:[
        {provide:CategoriesStoreItem,useClass:CategoriesStoreItemMock}
      ]
    });
    fixture = TestBed.createComponent(SidenavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
