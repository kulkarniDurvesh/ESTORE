import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CatnavigationComponent } from './components/catnavigation/catnavigation.component';
import { SidenavigationComponent } from './components/sidenavigation/sidenavigation.component';
import { ProductsComponent } from './components/products/products.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from './services/category/category.service';
import { CategoriesStoreItem } from './services/category/categories.storeItem';
import { ProductStoreItem } from './services/products/products.storeItem';
import { ProductsService } from './services/products/products.service';
import { RouterModule } from '@angular/router';
import { HomeRoutingModule } from './home-routing.module';
import { ProductsGalleryComponent } from './components/products-gallery/products-gallery.component';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { CartStoreItem } from './services/cart/cart.storeItem';
import { CartComponent } from './components/cart/cart.component';
import { UserSignupComponent } from './components/users/user-signup/user-signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserLoginComponent } from './components/users/user-login/user-login.component';
import { UserService } from './services/users/user-service';
import { OrderService } from './services/order/order.service';
import { PastordersComponent } from './components/pastorders/pastorders.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    CatnavigationComponent,
    SidenavigationComponent,
    ProductsComponent,
    ProductsGalleryComponent,
    ProductdetailsComponent,
    CartComponent,
    UserSignupComponent,
    UserLoginComponent,
    PastordersComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    SharedModule,
    HttpClientModule,
    RouterModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ],
  providers:[
    CategoryService,
    CategoriesStoreItem,
    ProductStoreItem,
    ProductsService,
    CartStoreItem,
    UserService,
    OrderService
  ]
})
export class HomeModule { }
