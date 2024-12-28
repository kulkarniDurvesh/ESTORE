import { Component, EventEmitter, Output } from '@angular/core';
import { CategoriesStoreItem } from '../../services/category/categories.storeItem';
import { Category } from '../../types/category.types';
import { NavigationEnd,Router } from '@angular/router';
import { filter } from 'rxjs';
@Component({
  selector: 'app-catnavigation',
  templateUrl: './catnavigation.component.html',
  styleUrls: ['./catnavigation.component.css']
})
export class CatnavigationComponent {

  displayOptions:boolean=true;


    @Output()
    categoryClicked :EventEmitter<number> = new EventEmitter<number>;
    constructor(public categoryStore:CategoriesStoreItem,private router:Router){
      router.events.pipe(filter(events=>events instanceof NavigationEnd)).
      subscribe((events)=>{
        this.displayOptions=(events as NavigationEnd).url === '/home/products'?true:false
      })
      
    }

    onClickCategory(category:Category):void{
      this.categoryClicked.emit(category.ID);
    }
}
