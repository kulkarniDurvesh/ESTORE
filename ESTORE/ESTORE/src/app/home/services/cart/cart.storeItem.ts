import { StoreItem } from "src/app/shared/storedItem";
import { Cart, CartItem } from "../../types/cart.types";
import { Observable } from "rxjs";
import { Product } from "../../types/product.types";


export class CartStoreItem extends StoreItem<Cart>{
    constructor(){
        const storedCart:any = sessionStorage.getItem('cart');
        if(storedCart){
            super(JSON.parse(storedCart))
        }else{
        super({
            products:[],
            totalAmount:0,
            totalProduct:0
        })
        }
    }


    get cart$():Observable<Cart>{
        return this.value$;
    }

    get cart():Cart{
        return this.value
    }
    
    addProduct(product:Product):void{
        const cartProduct:CartItem|undefined = this.cart.products.
        find((cartProduct)=>cartProduct.product.ID === product.ID);

        if(!cartProduct){
            this.cart.products = [
                ...this.cart.products,
                {
                    product:product,
                    amount: Number(product.PRICE),
                    quantity:1
                }
            ]
        }else{
            cartProduct.quantity++;
            cartProduct.amount += Number(product.PRICE);

        }
        this.cart.totalAmount += Number(product.PRICE);
        ++this.cart.totalProduct
        this.saveCart()
    }

    removeProduct(cartItem:CartItem):void
    {
        this.cart.products = this.cart.products.filter(
            (items)=>items.product.ID !== cartItem.product.ID
        );

        this.cart.totalProduct -= cartItem.quantity;
        this.cart.totalAmount -= cartItem.product.PRICE;  
        if(this.cart.totalProduct===0){
            sessionStorage.clear();
        }else{
            this.saveCart();
        } 
    }

    decreaseProductQuantity(cartItem:CartItem):void{
        const cartProduct:CartItem|undefined=this.cart.products.find(
            (cartProduct)=>cartProduct.product.ID === cartItem.product.ID
        );

        if(cartProduct)
        {
            if(cartProduct.quantity === 1){
                this.removeProduct(cartItem);
            }
            else{
                cartProduct.quantity--;
                this.cart.totalAmount -= Number(cartItem.product.PRICE);
                --this.cart.totalProduct;
                this.saveCart();    
            }
        }
    }


    saveCart():void{
        sessionStorage.clear();
        sessionStorage.setItem("cart",JSON.stringify(this.cart));
    }

    clearCart():void{
        sessionStorage.clear();
        this.cart.products = [];
        this.cart.totalAmount=0;
        this.cart.totalProduct = 0;
    }

}