  import { Component, OnDestroy, OnInit } from '@angular/core';
  import { ProductsService } from '../../services/products/products.service';
  import { ActivatedRoute } from '@angular/router';
  import { Product } from '../../types/product.types';
  import { Subscription } from 'rxjs';
  import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
  import { CartStoreItem } from '../../services/cart/cart.storeItem';


  @Component({
    selector: 'app-productdetails',
    templateUrl: './productdetails.component.html',
    styleUrls: ['./productdetails.component.css']
  })
  export class ProductdetailsComponent implements OnInit,OnDestroy {
    product:Product;
    subscriptions:Subscription = new Subscription();
    faShoppingCart = faShoppingCart;

    constructor(private activatedRoute:ActivatedRoute,
      private productService:ProductsService,
      private cart:CartStoreItem){}

    ngOnInit(): void {
      const productId:number = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.subscriptions.add(this.productService.getProductById(productId).subscribe((product)=>{
        this.product = product[0]
      }))
    }
    // onSelectProduct(productId:number){
    //   this.productService.getProductById(productId)
    // }

    addToCart(){
      this.cart.addProduct(this.product)
    }
    ngOnDestroy(): void {
      this.subscriptions.unsubscribe()
    }
  }
