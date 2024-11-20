import {Component, OnInit} from '@angular/core';
import { Observable, of } from 'rxjs';
import {RestaurantService} from '../services/restaurant.service';
import {MatLabel, MatFormField} from '@angular/material/form-field';
import {MatList, MatListItem} from '@angular/material/list';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {AsyncPipe, NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-restaurant-list',
  standalone: true,
  imports: [
    MatLabel,
    MatFormField,
    MatList,
    MatListItem,
    MatButton,
    MatInput,
    FormsModule,
    NgForOf,
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})

export class RestaurantListComponent implements OnInit{
  searchTerm: string = '';
  restaurants$!: Observable<any[]>;
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(private restaurantService: RestaurantService) {
  }

  ngOnInit(): void {
    this.fetchRestaurants();
  }

  fetchRestaurants(): void {
    this.restaurants$ = this.restaurantService.getRestaurants(this.searchTerm, this.currentPage, this.pageSize);
  }

  onSearch(): void {
    this.currentPage = 1;  // Reset to the first page on new search
    this.fetchRestaurants();
  }

  nextPage(): void {
    this.currentPage++;
    this.fetchRestaurants();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchRestaurants();
    }
  }
}
