import { of, throwError } from 'rxjs';
import { DeliveryAddress } from 'src/app/home/types/cart.types';
import { PastOrders } from 'src/app/home/types/order.types'; // Adjust the import based on your actual types

export class OrderServiceMock {
  getOrders(email: string) {
    // Mock the response with some sample data
    const mockPastOrders: PastOrders[] = [
      { userName:"Durvesh",
        address:"123 street",
        city:"Pune",
        state:"MH",
        pin:"123123",
        total:100,
        orderDate:"2024-01-01",
        orderId:1,

     },
     
    ];
    return of(mockPastOrders); // Return an observable with mock data
  }

  getOrderProducts(orderId: number) {
    // Mock the response for order products
    const mockProducts = [
      { productId: 1, productName: 'Product A', quantity: 2 },
      { productId: 2, productName: 'Product B', quantity: 1 }
    ];
    return of(mockProducts); // Return an observable with mock products
  }

  saveOrder(deliveryAddress: DeliveryAddress, userEmail: string) {
    // Simulate success response
    const successResponse = { message: 'Order saved successfully', orderId: 123 };

    // Simulate an error response if needed
    const simulateError = false;

    if (simulateError) {
      return throwError(() => new Error('Failed to save order'));
    }

    return of(successResponse); // Return an observable with the mock success response
  }

}
