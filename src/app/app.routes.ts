import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {RestaurantListComponent} from './restaurant-list/restaurant-list.component';
import {CartComponent} from './cart/cart.component';
import {MenuComponent} from './menu/menu.component';
import { SignInComponent } from './sign-in/sign-in.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},  // Home Page
  {path: 'restaurant-list', component: RestaurantListComponent},  // Restaurant List Page
  {path: 'cart', component: CartComponent}, // Cart Page
  {path: 'menu/:id', component: MenuComponent},
  { path: 'sign-in', component: SignInComponent }
];
