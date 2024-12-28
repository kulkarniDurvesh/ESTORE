import { of } from "rxjs";
import { Product } from "src/app/home/types/product.types";

export class ProductServiceMock{
    getAllProducts():any{}
    getProductById(productId: number) {
        const mockProduct: Product[] = [
          {
            ID: productId,
            PRODUCT_NAME: 'Mock Product',
            PRODUCT_DESCRIPTION: 'Mock Description',
            PRICE: 200,
            PRODUCT_IMG: 'mock-image.jpg',
            CATEGORY_ID: 1,
            ratings: 5,
          },
        ];
        return of(mockProduct); // Returns an observable of the mock product array
      }
}