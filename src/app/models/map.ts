import { Coords } from "./tours";

export interface IWeatherResponse {
    current: IWeatherCurrent, 
    hourly: IWeatherHourly
}

export type WeatherCurrentValue = 0 | 1;

export interface IWeatherCurrent {
    is_day: WeatherCurrentValue,
    rain: WeatherCurrentValue,
    snowfall: WeatherCurrentValue,
}

export interface IWeatherHourly {
    temperature_2m: number[],
}

export interface CountryWeatherInfo {
    countrieData: Coords;
    weatherData: {
      isDay: boolean; 
      snowfall: number;
      rain: number; 
      currentWeather: number;
    };
}