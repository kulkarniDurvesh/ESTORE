import { Component,EventEmitter,Output, OnDestroy } from '@angular/core';
import { Category } from '../../types/category.types';
import { CategoriesStoreItem } from '../../services/category/categories.storeItem';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenavigation',
  templateUrl: './sidenavigation.component.html',
  styleUrls: ['./sidenavigation.component.css']
})
export class SidenavigationComponent implements OnDestroy{
  categories:Category[]=[];
  @Output()
  subCategoryClicked:EventEmitter<number> = new EventEmitter<number>(); 
  subscriptions:Subscription = new Subscription();

  constructor(categoryStore:CategoriesStoreItem){
    this.subscriptions.add(categoryStore.categories$.subscribe((categories)=>{
      this.categories = categories
    }));
  }


  getCategories(parentCategoryId?:number):Category[]{
    return this.categories.filter((category)=>
      parentCategoryId ? category.PARENT_CATEGORY_ID === parentCategoryId : category.PARENT_CATEGORY_ID===null  
    )
  }

  onSubCategoryClickedEvent(subCategory:Category):void{
    this.subCategoryClicked.emit(subCategory.ID);
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
