import { Component } from '@angular/core';
import { ProductStoreItem } from '../../services/products/products.storeItem';

@Component({
  selector: 'app-products-gallery',
  templateUrl: './products-gallery.component.html',
  styleUrls: ['./products-gallery.component.css']
})
export class ProductsGalleryComponent {

  constructor(private productStoreitem:ProductStoreItem){}
  onSelectSubCategory(subCategoryId:number):void{
    this.productStoreitem.loadProducts('subcategoryid='+subCategoryId)
  }
}
