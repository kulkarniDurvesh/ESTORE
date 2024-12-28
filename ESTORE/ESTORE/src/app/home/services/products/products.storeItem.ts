import { StoreItem } from "src/app/shared/storedItem";
import { Product } from "../../types/product.types";
import { ProductsService } from "./products.service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class ProductStoreItem extends StoreItem<Product[]>{
    constructor(private productService: ProductsService){
        super([])
    }

    async loadProducts(query?:string){
         this.productService.getAllProducts(query).subscribe((products)=>{
            this.setValue(products);
        })
    }

    get products$():Observable<Product[]>{
        return this.value$;
    }
    
}

