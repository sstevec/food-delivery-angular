import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, of, tap} from 'rxjs';
import { BackendIp } from './constants';
import {MOCK_FOOD_ITEMS, MOCK_RESTAURANTS} from './mock-data';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private baseUrl = BackendIp;
  private cacheData: any[] = [];
  private totalImages = 10;

  constructor(private http: HttpClient) {}

  getAllRestaurants(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "/restaurant/fetchAllRestaurants").pipe(
      map(restaurants =>
        restaurants.map(restaurant => ({
          ...restaurant,
          imageUrl: `assets/images/res_image${this.getRandomInt(1, this.totalImages)}.jpeg` // Assign a random image
        }))
      )
    );
  }
  getRestaurants(searchTerm: string, page: number, pageSize: number): Observable<any[]> {
    if (this.cacheData.length === 0) {
      return this.getAllRestaurants().pipe(
        tap(data => {
          this.cacheData = data; // Cache the data once fetched
        }),
        map(data => this.filterAndPaginateRestaurants(data, searchTerm, page, pageSize))
      );
    } else {
      // Use cached data for filtering and pagination
      const filteredData = this.filterAndPaginateRestaurants(this.cacheData, searchTerm, page, pageSize);
      return of(filteredData); // Return as an observable
    }
  }

  private filterAndPaginateRestaurants(data: any[], searchTerm: string, page: number, pageSize: number): any[] {
    // Filter by search term if provided
    let filteredRestaurants = data;
    if (searchTerm) {
      filteredRestaurants = data.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Paginate the filtered results
    const startIndex = (page - 1) * pageSize;
    return filteredRestaurants.slice(startIndex, startIndex + pageSize);
  }

  getRestaurantById(id: number): Observable<any> {
    if (this.cacheData.length === 0) {
      // Fetch all data if cache is empty
      return this.getAllRestaurants().pipe(
        tap(data => {
          this.cacheData = data; // Cache the fetched data
        }),
        map(data => this.findRestaurantInCache(data, id)) // Find the restaurant in the fetched data
      );
    } else {
      // Use cached data to find the restaurant
      const restaurant = this.findRestaurantInCache(this.cacheData, id);
      return of(restaurant); // Return as an observable
    }
  }

  private findRestaurantInCache(data: any[], id: number): any {
    return data.find(restaurant => restaurant.id === id) || null; // Return null if not found
  }

  getMenuByRestaurantId(restaurantId: number): Observable<any[]> {
    const url = `${this.baseUrl}/foodCatalogue/fetchRestaurantAndFoodItemsById/${restaurantId}`;
    return this.http.get<any>(url).pipe(
      map(response => {
        // Replace itemDescription with category and itemName with name
        const transformedFoodItems = (response.foodItemsList || []).map((item: { itemName: any; itemDescription: any; }) => ({
          ...item,
          name: item.itemName, // Rename itemName to name
          category: item.itemDescription, // Rename itemDescription to category
        }));

        // If foodItemsList is empty, use transformed MOCK_FOOD_ITEMS
        if (transformedFoodItems.length === 0) {
          return MOCK_FOOD_ITEMS;
        }

        return transformedFoodItems;
      })
    );
  }

  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
