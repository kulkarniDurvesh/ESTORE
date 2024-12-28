import { Component } from '@angular/core';
//import { Product } from '../../types/product.types';
//import { ProductsService } from '../../services/products/products.service';
import { ProductStoreItem } from '../../services/products/products.storeItem';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../../types/product.types';
import { CartStoreItem } from '../../services/cart/cart.storeItem';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  //providers:[ProductsService]
})
export class ProductsComponent {
  //products:Product[]=[];
  // constructor(private productService:ProductsService){
  //   this.productService.getAllProducts().subscribe((product)=>{
  //     this.products = product
  //   })
  //   console.log(this.products);
  // }

  faShoppingCart = faShoppingCart;
  constructor(public productStoreItem:ProductStoreItem,private cart:CartStoreItem){

  }

  addToCart(product:Product){
    this.cart.addProduct(product);
  }

  
}
