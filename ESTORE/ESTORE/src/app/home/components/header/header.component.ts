import { Component, EventEmitter, Output,OnDestroy } from '@angular/core';
import { faSearch,faUserCircle,faHeart,faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CategoriesStoreItem } from '../../services/category/categories.storeItem';
import { SearchKeywords } from '../../types/searchKeywords.types';
import { NavigationEnd,Router } from '@angular/router';
import { filter } from 'rxjs';
import { CartStoreItem } from '../../services/cart/cart.storeItem';
import { UserService } from '../../services/users/user-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {
  faSearch = faSearch;
  faUserCircle = faUserCircle;
  faHeart = faHeart;
  faShoppingCart = faShoppingCart;
  subscription:Subscription = new Subscription()
  displaySearchBar:boolean=true;
  isUserAuthenticated:boolean=false;
  userName:string='';


  @Output()
  searchClicked : EventEmitter<SearchKeywords> = new EventEmitter<SearchKeywords>();

  constructor(public categoryStore:CategoriesStoreItem,private router:Router,public cartStore:CartStoreItem,
    private userService:UserService){
    router.events.pipe(filter(events=>events instanceof NavigationEnd))
    .subscribe((events)=>{
      this.displaySearchBar = (events as NavigationEnd).url === '/home/products'?true:false
    })

    this.subscription.add(this.userService.isUserAuthenticated$.subscribe(
      (result)=>{
        this.isUserAuthenticated = result
      }));

    this.subscription.add(this.userService.loggedInUser$.subscribe(
      (result)=>{
        this.userName = result.firstName
      }
    ))

  }

  onSearchClick(keyword:string,categoryId:string){
    this.searchClicked.emit({categoryId:parseInt(categoryId),keyword:keyword});
  }

  navigateToCart():void{
    this.router.navigate(['home/cart'])
  }

  logout():void{
    this.userService.logout();
    this.router.navigate(['home/products'])
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  pastOrders():void{
    this.router.navigate(['home/pastorders']);
  }

}
