import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../shared/api';
import { Tour } from '../models/tours';

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  constructor(private http: HttpClient) { }

  getTours(): Observable<{ tours: Tour[] }> { 
    return this.http.get<{ tours: Tour[] }>(API.tours);
  }

  getTourById(id: string): Observable<Tour> { 
    const tourApi = API.tour;
    return this.http.get<Tour>(`${tourApi}/${id}`); 
  }

  getNearestTourByLocationId(id: string): Observable<Tour[]> {
    return this.http.get<Tour[]>(API.nearestTours, {
      params: {locationId: id}
    });
  }

  searchTours(tours: Tour[], value: string): Tour[] {
    if (Array.isArray(tours)) {
      return tours.filter((tour) => {

        if (tour && typeof tour.name === 'string') {
          return tour.name.toLowerCase().includes(value.toLowerCase());
        } else {
          return false;
        }
      });
    } else {
      return [];
    }
  }
}
