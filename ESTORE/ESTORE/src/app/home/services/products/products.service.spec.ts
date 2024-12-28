// import { TestBed } from '@angular/core/testing';

// import { ProductsService } from './products.service';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { ProductServiceMock } from 'src/app/shared/mocks/product-service.mocks';

// describe('ProductsService', () => {
//   let service: ProductsService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports:[HttpClientTestingModule],
//       providers:[{provide:ProductsService,useClass:ProductServiceMock}]
//     });
//     service = TestBed.inject(ProductsService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { Product } from '../../types/product.types';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;

  // Sample data to mock HTTP response
  const mockProducts: Product[] = [
    { ID:1,CATEGORY_ID:1,PRICE:100,PRODUCT_DESCRIPTION:"asd",PRODUCT_IMG:"wdw",PRODUCT_NAME:"xdw",ratings:3 },
    //{ id: 2, name: 'Product 2', price: 150 }
  ];

  const mockProduct: Product[] = [{ID:1,CATEGORY_ID:1,PRICE:100,PRODUCT_DESCRIPTION:"asd",PRODUCT_IMG:"wdw",PRODUCT_NAME:"xdw",ratings:3 }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService]
    });

    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify that no outstanding requests remain after each test
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all products', () => {
    service.getAllProducts().subscribe(products => {
      expect(products.length).toBe(1);
      expect(products).toEqual(mockProducts);
    });

    // Expect the HTTP request to be made
    const req = httpMock.expectOne('http://localhost:5001/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts); // Mock the response
  });

  it('should fetch products with query parameter', () => {
    const query = 'category=electronics';

    service.getAllProducts(query).subscribe(products => {
      expect(products.length).toBe(1);
      expect(products).toEqual(mockProducts);
    });

    // Expect the HTTP request with query parameter
    const req = httpMock.expectOne('http://localhost:5001/products?' + query);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts); // Mock the response
  });

  it('should fetch a product by id', () => {
    const productId = 1;

    service.getProductById(productId).subscribe(product => {
      expect(product).toEqual(mockProduct);
    });

    // Expect the HTTP request for a single product
    const req = httpMock.expectOne(`http://localhost:5001/products/${productId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct); // Mock the response
  });
});
