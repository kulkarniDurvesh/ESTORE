import { TestBed } from "@angular/core/testing"
import { CategoriesStoreItem } from "./categories.storeItem"
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { CategoryService } from "./category.service";
import { CategoriesStoreItemMock } from "src/app/shared/mocks/categories.storeItem.mocks";
import { Category } from "../../types/category.types";
import { of } from "rxjs";

describe('CategoriesStoreItem', () => {
    let categoryStoreItem:CategoriesStoreItem;
    let httpTestingController:HttpTestingController;
    let categoryService:CategoryService;

    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports:[HttpClientTestingModule],
            providers:[
                {provide:CategoryService},
                {provide:CategoriesStoreItem,useClass:CategoriesStoreItemMock}
            ]
        })
        categoryStoreItem = TestBed.inject(CategoriesStoreItem);
        httpTestingController = TestBed.inject(HttpTestingController);
        categoryService = TestBed.inject(CategoryService);
    });

    it('should be created', () => {
        expect(categoryStoreItem).toBeTruthy();
      });

    it('should load categories on calling loadCategories and update the values',()=>{
        const mockCategories: Category[] = [
            { ID: 1, CATEGORY: 'Category 1', PARENT_CATEGORY_ID: 1 },
            { ID: 2, CATEGORY: 'Category 2', PARENT_CATEGORY_ID: 1 },
            { ID: 3, CATEGORY: 'Category 3'},
            { ID: 4, CATEGORY: 'Category 4'},
        ];

        spyOn(categoryService,'getAllCategories').and.returnValue(of(mockCategories));

        categoryStoreItem.loadCategories();
        categoryStoreItem.categories$.subscribe(categories=>{
            expect(categories).toEqual(mockCategories);
        })
    });

    it('should filter top-level categories',()=>{
        const mockCategories:Category[] = [
            {ID:1,CATEGORY:'Category 1'},
            {ID:2,CATEGORY:'Category 2'},
            {ID:3,CATEGORY:'Category 3',PARENT_CATEGORY_ID:2},

        ];
        
        spyOn(categoryService,'getAllCategories').and.returnValue(of(mockCategories));
        categoryStoreItem.loadCategories();

        categoryStoreItem.topLevelCategories$.subscribe((topLevelCategories)=>{
            expect(topLevelCategories).toEqual([
                {ID:1,CATEGORY:'Category 1'},
                {ID:2,CATEGORY:'Category 2'}
            ]);
        });
    });
    
    it('should call category service getAllCategories when loadCategories is called', () => {
        // Arrange
        const mockCategories: Category[] = [
            { ID: 1, CATEGORY: 'Category 1', PARENT_CATEGORY_ID: 1 },
            { ID: 2, CATEGORY: 'Category 2', PARENT_CATEGORY_ID: 1 },
            { ID: 3, CATEGORY: 'Category 3'},
            { ID: 4, CATEGORY: 'Category 4'},
        ];
    
        spyOn(categoryService,'getAllCategories').and.returnValue(of(mockCategories));
        // Act
        categoryStoreItem.loadCategories();
    
        // Assert
        //expect(c).toHaveBeenCalled();
        categoryStoreItem.categories$.subscribe((categories) => {
          expect(categories).toEqual(mockCategories);
        });
      });
    
      

})