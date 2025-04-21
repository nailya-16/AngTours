import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, Subject } from 'rxjs';
import { API } from '../shared/api';
import { ICountriesResponseItem, Tour, ToursServerResponse } from '../models/tours';

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  //type
  private tourTypeSubject = new Subject<string>();    //TODO defined type
  readonly tourType$ = this.tourTypeSubject.asObservable();

  //date
  private tourDateSubject = new Subject<Date>(); 
  readonly tourDate$ = this.tourDateSubject.asObservable();

  constructor(private http: HttpClient) { }

  getTours(): Observable<Tour[]> { 
    const countries = this.http.get<ICountriesResponseItem[]>(API.countries);
    const tours = this.http.get<ToursServerResponse>(API.tours);

  //parralel
    return forkJoin<[ICountriesResponseItem[], ToursServerResponse]>([countries, tours]).pipe(
      map((data) => {
        console.log('data', data);

        let toursWithCountries = [] as Tour[];
        const toursArr = data[1].tours;
        const countriesMap = new Map();

        data[0].forEach(country => {
          countriesMap.set(country.iso_code2, country);
        });

        if (Array.isArray(toursArr)) {
          console.log('****toursArr', toursArr)
          toursWithCountries = toursArr.map((tour) => {
            return {
              ...tour,
              country: countriesMap.get(tour.code) || null     //add new prop
            }
          });
        }
        return toursWithCountries;
      })
    ) 
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

  initChangeTourType(val: string): void {      //TODO defined type
    this.tourTypeSubject.next(val);
  }

  initChangeTourDate(val: Date): void {     //TODO defined type
    this.tourDateSubject.next(val);
  }
}
