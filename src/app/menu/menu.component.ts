import {Component, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RestaurantService} from '../services/restaurant.service';
import {CartService} from '../services/cart.service';
import {filter, map, Observable} from 'rxjs';
import {MatButton, MatIconButton} from '@angular/material/button';
import {AsyncPipe, NgForOf, NgIf, NgStyle} from '@angular/common';
import {MatCard} from '@angular/material/card';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {MatIcon} from '@angular/material/icon';


@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  imports: [
    MatButton,
    NgForOf,
    AsyncPipe,
    MatCard,
    NgIf,
    MatGridTile,
    MatGridList,
    MatIconButton,
    MatIcon,
    NgStyle
  ],
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  restaurant$: Observable<{
    id: 1,
    name: '404',
    imageUrl: 'assets/images/res_image2.jpeg'
  }>;  // Observable for async data
  foodItems$: Observable<any[]>;                    // Observable for async data

  // Signals for frontend state
  categories = signal<string[]>([]);
  filteredItems = signal<any[]>([]);
  cartItems = signal<any[]>([]);
  selectedCategory = signal<string | null>(null);

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private cartService: CartService,
    private router: Router
  ) {
    const restaurantId = Number(this.route.snapshot.paramMap.get('id'));
    this.restaurant$ = this.restaurantService.getRestaurantById(restaurantId);

    this.foodItems$ = this.restaurantService.getMenuByRestaurantId(restaurantId);
  }

  ngOnInit(): void {
    this.foodItems$.subscribe(items => {
      this.categories.set(Array.from(new Set(items.map(item => item.category))));

      if (this.categories().length > 0) {
        this.selectCategory(this.categories()[0]);  // Select the first category by default
      }
    });

    // Initialize cart items from the service
    this.cartService.getCartItems().subscribe(items => this.cartItems.set(items));

  }

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
    this.foodItems$.subscribe(items => {
      const res = items.filter(item => item.category === category)
      this.filteredItems.set(res);
    })
  }

  addToCart(food: any): void {
    this.cartService.addToCart(food);
    this.cartService.getCartItems().subscribe(items => this.cartItems.set(items));
  }

  increaseQuantity(item: any): void {
    this.cartService.addToCart(item);
    this.cartService.getCartItems().subscribe(items => this.cartItems.set(items));
  }

  decreaseQuantity(item: any): void {
    this.cartService.removeFromCart(item);
    this.cartService.getCartItems().subscribe(items => this.cartItems.set(items));
  }

  goToCartPage(): void {
    this.router.navigate(['/cart']);
  }
}
