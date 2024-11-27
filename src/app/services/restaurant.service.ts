import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { BackendIp } from './constants';
import {MOCK_FOOD_ITEMS, MOCK_RESTAURANTS} from './mock-data';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private baseUrl =  BackendIp +'/restaurant';

  constructor(private http: HttpClient) {}

  // getRestaurants(searchTerm: string, page: number, pageSize: number): Observable<any[]> {
  //   const params: any = {
  //     page: page.toString(),
  //     pageSize: pageSize.toString(),
  //   };
  //
  //   if (searchTerm) {
  //     params.search = searchTerm;
  //   }
  //
  //   return this.http.get<any[]>(this.baseUrl + "/getRestaurants", { params });
  // }

  getRestaurants(searchTerm: string, page: number, pageSize: number): Observable<any[]> {
    // Filter by search term if provided
    let filteredRestaurants = MOCK_RESTAURANTS;
    if (searchTerm) {
      filteredRestaurants = MOCK_RESTAURANTS.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Paginate the filtered results
    const startIndex = (page - 1) * pageSize;
    const paginatedRestaurants = filteredRestaurants.slice(startIndex, startIndex + pageSize);

    // Return as an observable to simulate async API call
    return of(paginatedRestaurants);
  }

  getRestaurantById(id: number): Observable<any | undefined> {
    const restaurant = MOCK_RESTAURANTS.find(r => r.id === id);
    return of(restaurant);
  }

  getMenuByRestaurantId(restaurantId: number): Observable<any[]> {
    // Filter menu items by restaurant ID, assuming items have a `restaurantId` property
    return of(MOCK_FOOD_ITEMS);
  }
}
