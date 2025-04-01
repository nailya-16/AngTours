import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../shared/api';

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  constructor(private http: HttpClient) { }

  getTours(): Observable<any> {     //TODO add types for response
    return this.http.get(API.tours);
  }

  getTourById(id: string):Observable<any> {  //TODO add types for responce
    const tourApi = API.tour;
    //const path = API.tour+'/'+id;            //альтернативный способ
    return this.http.get(`${tourApi}/${id}`);
  }

}
