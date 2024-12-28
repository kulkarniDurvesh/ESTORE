import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoriesStoreItem } from './categories.storeItem';
import { CategoriesStoreItemMock } from 'src/app/shared/mocks/categories.storeItem.mocks';
import { Category } from '../../types/category.types';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpTestingController:HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[
        {provide:CategoriesStoreItem,useClass:CategoriesStoreItemMock},
        {provide:CategoryService}
      ]
    });
    service = TestBed.inject(CategoryService);
    httpTestingController = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the getAllCategories method',()=>{
    const Category:Category[]=[{
      ID:12,
      CATEGORY:"MEN",
      PARENT_CATEGORY_ID:1
    }];
    service.getAllCategories().subscribe(response=>{
      expect(response).toEqual(Category)
    })
    const request = httpTestingController.expectOne('http://localhost:5001/productCategories');
    expect(request.request.method).toBe('GET');

    // Check the request body
    //expect(request.request.body).toEqual(user);

    // Flush the request with mock response
    //request.flush(mockResponse);


  });

});
