import { Injectable } from '@angular/core';
import { Product } from '../../types/product.types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { products } from './product.data';

@Injectable()
export class ProductsService {

  constructor(private httpClient:HttpClient) { }
  
  getAllProducts(query?:string):Observable<Product[]>{
    let url = 'http://localhost:5001/products';
    if(query){
      url+='?'+query
    }
    return this.httpClient.get<Product[]>(url);
  }

  getProductById(id:number):Observable<Product[]>{
    let url = 'http://localhost:5001/products/'+id
    return this.httpClient.get<Product[]>(url);
  }

}
