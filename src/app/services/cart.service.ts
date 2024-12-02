import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: { [id: number]: { item: any; quantity: number } } = {};
  private current_order: any = null;
  private past_orders: any[] = [];

  constructor() {
    this.loadFromLocalStorage(); // Load data from localStorage on service initialization
  }

  // Load cart and past orders from localStorage
  private loadFromLocalStorage(): void {
    const cartJson = localStorage.getItem('cart');
    const pastOrdersJson = localStorage.getItem('past_orders');

    if (cartJson) {
      this.cart = JSON.parse(cartJson);
    }

    if (pastOrdersJson) {
      this.past_orders = JSON.parse(pastOrdersJson);
    }
  }

  // Save cart and past orders to localStorage
  private saveToLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    localStorage.setItem('past_orders', JSON.stringify(this.past_orders));
  }

  addToCart(item: any): void {
    if (this.cart[item.id]) {
      this.cart[item.id].quantity += 1;
    } else {
      this.cart[item.id] = { item, quantity: 1 };
    }
    this.saveToLocalStorage(); // Save updated cart to localStorage
  }

  removeFromCart(item: any): void {
    if (this.cart[item.id]) {
      this.cart[item.id].quantity -= 1;
      if (this.cart[item.id].quantity <= 0) {
        delete this.cart[item.id];
      }
    }
    this.saveToLocalStorage(); // Save updated cart to localStorage
  }

  getCartItems(): Observable<any[]> {
    return of(Object.values(this.cart));
  }

  clearCart(): void {
    this.cart = {};
    this.saveToLocalStorage(); // Save cleared cart to localStorage
  }

  getPaginatedPastOrders(page: number, pageSize: number): Observable<any[]> {
    // Calculate start and end index for pagination
    const start = (page - 1) * pageSize;
    const paginatedOrders = this.past_orders.slice(start, start + pageSize);

    return of(paginatedOrders);
  }

  computeTotalPrice(): number {
    let totalPrice = 0;

    for (const id in this.cart) {
      if (this.cart.hasOwnProperty(id)) {
        const cartEntry = this.cart[id];
        const itemPrice = cartEntry.item.price; // Assume price is stored in item
        const quantity = cartEntry.quantity;

        totalPrice += itemPrice * quantity;
      }
    }

    return totalPrice;
  }

  assembleOrder(resName: string): void {
    const total = this.computeTotalPrice();
    const items = Object.values(this.cart); // Convert cart object to an array of items
    const currentDate = new Date().toISOString(); // Get current date and time in ISO format

    this.current_order = {
      date: currentDate,
      res_name: resName,
      total: total,
      items: items
    };

    console.log('Order assembled:', this.current_order); // Optional: log the order for debugging
  }

  getCurrentOrder(): any {
    return this.current_order;
  }

  insert_current_order(): void {
    this.past_orders.unshift(this.current_order); // Add the current order to past orders
    this.saveToLocalStorage(); // Save updated past orders to localStorage
  }
}
