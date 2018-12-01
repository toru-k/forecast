import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { OpenWeatherMap } from '../shared/models/open-weather-map';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherMapService {
  private API = '//api.openweathermap.org/data/2.5/';
  private APP_ID = '';
  constructor(public http: HttpClient) {}

  /**
   * 現在の天気を取得
   */
  current(city: string): Observable<OpenWeatherMap.Current> {
    let params: HttpParams = new HttpParams();
    const data = {
      appid: this.APP_ID,
      units: 'metric',
      lang: 'jp',
      q: city
    };
    Object.keys(data).forEach(function(key) {
      params = params.set(key, data[key]);
    });
    return this.http.get<OpenWeatherMap.Current>(`${this.API}/weather`, {
      params
    });
  }

  forecast(city: string): Observable<OpenWeatherMap.Forecast> {
    let params: HttpParams = new HttpParams();
    const data = {
      appid: this.APP_ID,
      units: 'metric',
      lang: 'jp',
      cnt: 24,
      q: city
    };
    Object.keys(data).forEach(function(key) {
      params = params.append(key, data[key]);
    });
    return this.http.get<OpenWeatherMap.Forecast>(`${this.API}/forecast`, {
      params
    });
  }
}
