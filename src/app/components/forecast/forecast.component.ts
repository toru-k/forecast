import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OpenWeatherMapService } from '../../services/open-weather-map.service';
import { OpenWeatherMap } from '../../shared/models/open-weather-map';

import { Observable, throwError } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import {
  transition,
  trigger,
  query,
  stagger,
  useAnimation
} from '@angular/animations';
import { slideFadeIn } from '../../shared/animation/app.animations';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
  animations: [
    trigger('slideFade', [
      transition(':enter', [
        query('mat-list-item', [stagger(100, [useAnimation(slideFadeIn)])])
      ])
    ])
  ]
})
export class ForecastComponent implements OnInit {
  public currentWeatherObservable: Observable<OpenWeatherMap.Current>;
  public forecastObservable: Observable<OpenWeatherMap.Forecast>;

  public cityName: string;

  constructor(
    private route: ActivatedRoute,
    private openWeatherMapService: OpenWeatherMapService
  ) {}

  ngOnInit() {
    // 現在の天気
    this.currentWeatherObservable = this.route.params.pipe(
      switchMap(param => {
        this.cityName = param['city'];
        return this.openWeatherMapService.current(param['city']);
      })
    );

    // １周間の天気
    this.forecastObservable = this.route.params.pipe(
      switchMap(param => {
        return this.openWeatherMapService.forecast(param['city'], 16).pipe(
          map((res: OpenWeatherMap.Forecast) => {
            return res;
          })
        );
      })
    );
  }
}
