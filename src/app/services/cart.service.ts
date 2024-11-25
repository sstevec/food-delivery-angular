import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {PAST_ORDERS} from './mock-data';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  private cart: { [id: number]: { item: any; quantity: number } } = {};

  addToCart(item: any): void {
    if (this.cart[item.id]) {
      this.cart[item.id].quantity += 1;
    } else {
      this.cart[item.id] = { item, quantity: 1 };
    }
  }

  removeFromCart(item: any): void {
    if (this.cart[item.id]) {
      this.cart[item.id].quantity -= 1;
      if (this.cart[item.id].quantity <= 0) {
        delete this.cart[item.id];
      }
    }
  }

  getCartItems(): Observable<any[]> {
    return of(Object.values(this.cart));
  }

  clearCart(): void {
    this.cart = {};
  }

  getPaginatedPastOrders(page: number, pageSize: number): Observable<any[]> {
    // Simulate a backend response with mock data

    // Calculate start and end index for pagination
    const start = (page - 1) * pageSize;
    const paginatedOrders = PAST_ORDERS.slice(start, start + pageSize);

    return of(paginatedOrders);  // Replace with an actual HTTP call to backend
  }
}
