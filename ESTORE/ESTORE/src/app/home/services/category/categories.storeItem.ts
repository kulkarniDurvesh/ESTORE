import { StoreItem } from "src/app/shared/storedItem";
import { Category } from "../../types/category.types";
import { CategoryService } from "./category.service";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable,map } from "rxjs";

@Injectable()
export class CategoriesStoreItem extends StoreItem<Category[]>{
    private categoriesSubject = new BehaviorSubject<Category[]>([]);
    constructor(private categoryService:CategoryService){
        super([])
    }

    async loadCategories(){
        this.categoryService.getAllCategories().subscribe((categories)=>{
            this.setValue(categories);
        })
    }

    get categories$():Observable<Category[]>{
        return this.value$;
    }

    get topLevelCategories$():Observable<Category[]>{
        return this.value$.pipe(map((categories)=>
            categories.filter((category)=>category.PARENT_CATEGORY_ID===null)
        ));
    }
    
}
