import {Component, OnInit, signal} from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {CartService} from '../services/cart.service';
import {MatButton} from '@angular/material/button';
import {Observable} from 'rxjs';
import {MatCard} from '@angular/material/card';
import {AsyncPipe, DatePipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'cancel-confirmation-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButton],
  template: `
    <h2 mat-dialog-title>Clear Cart</h2>
    <mat-dialog-content>Are you sure you want to clear the cart?</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="'no'">No</button>
      <button mat-button [mat-dialog-close]="'yes'" color="warn">Yes</button>
    </mat-dialog-actions>
  `
})
export class CancelConfirmationDialog {
}


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatDialogModule, CancelConfirmationDialog, MatCard, NgForOf, MatButton, AsyncPipe, DatePipe, NgIf],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  currentOrderItems = signal<any[]>([]);
  paginatedOrders$!: Observable<any[]>;
  currentPage = 1;
  pageSize = 5;

  constructor(
    private cartService: CartService,
    private dialog: MatDialog
  ) {
    this.loadCurrentOrder();
    this.loadPastOrders();
  }

  ngOnInit(): void {
    this.loadCurrentOrder();
    this.loadPastOrders();  // Load the first page of past orders
  }

  loadCurrentOrder(): void {
    this.cartService.getCartItems().subscribe(items => this.currentOrderItems.set(items));
  }

  loadPastOrders(): void {
    this.paginatedOrders$ = this.cartService.getPaginatedPastOrders(this.currentPage, this.pageSize);
  }

  nextPage(): void {
    this.currentPage++;
    this.loadPastOrders();  // Fetch next page of past orders
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPastOrders();  // Fetch previous page of past orders
    }
  }

  payOrder(): void {
    this.cartService.insert_current_order();
    this.cartService.clearCart();
    this.loadCurrentOrder();
    this.loadPastOrders();
  }

  cancelOrder(): void {
    const dialogRef = this.dialog.open(CancelConfirmationDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.cartService.clearCart();
        this.loadCurrentOrder();
      }
    });
  }
}

