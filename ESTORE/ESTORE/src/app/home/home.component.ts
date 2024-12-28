import { Component } from '@angular/core';
import { CategoriesStoreItem } from './services/category/categories.storeItem'; 
import { ProductStoreItem } from './services/products/products.storeItem';
import { SearchKeywords } from './types/searchKeywords.types';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ProductServiceMock } from '../shared/mocks/product-service.mocks';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(
    private categoryStoreItem:CategoriesStoreItem, 
    public productStoreitem:ProductStoreItem,
    private router:Router){

    this.categoryStoreItem.loadCategories();
    this.productStoreitem.loadProducts();
    this.router.events.pipe(filter(event=>event instanceof NavigationEnd)).subscribe(event=>{
      if((event as NavigationEnd).url === '/home'){
        router.navigate(['/home/products']);
      }
    })
  }



  onSelectCategory(mainCategoryId:number):void{
    this.productStoreitem.loadProducts('maincategoryid='+mainCategoryId)
  }

  onSearchKeyword(searchKeyword:SearchKeywords){
    this.productStoreitem.loadProducts('maincategoryid='+searchKeyword.categoryId+'&keyword='+searchKeyword.keyword)
  }
}
