import { Product } from "./product.types";

export interface CartItem{
    product:Product;
    quantity:number;
    amount:number
}

export interface Cart{
    products:CartItem[];
    totalAmount:number;
    totalProduct:number;   
}

export interface DeliveryAddress{
    userName:string;
    address:string;
    city:string;
    state:string;
    pin:string; 
}

