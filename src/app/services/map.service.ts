import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILocation } from '../models/tours';
import { Observable } from 'rxjs';
import { IWeatherResponse } from '../models/map';
import { API } from '../shared/api';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }

  getWeather(coord: ILocation): Observable<IWeatherResponse> {
    const params = {
      "latitude": coord.lat,
      "longitude": coord.lng,
      "hourly": "temperature_2m",
      "current": ["is_day", "snowfall", "rain"],
      "forecast_day": 1
    };

    return this.http.get<IWeatherResponse>(API.getWeather,{params})
  }

}
