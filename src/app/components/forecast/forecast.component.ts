import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OpenWeatherMapService } from '../../services/open-weather-map.service';
import { OpenWeatherMap } from '../../shared/models/open-weather-map';

import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import {
  transition,
  trigger,
  query,
  stagger,
  useAnimation
} from '@angular/animations';
import { slideFadeIn } from '../../shared/animation/app.animations';

import { ForecastChartData } from '../../shared/models/forecast-chart-data';
import { UnixTimeDatePipe } from '../../shared/pipes/unix-time-date.pipe';

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

  public lineChartLabels: string[] = [];
  public lineChartTempData: ForecastChartData[] = [];
  public lineChartPressureData: ForecastChartData[] = [];
  public lineChartHumidityData: ForecastChartData[] = [];

  private unixTimeDatePipe: UnixTimeDatePipe = new UnixTimeDatePipe();

  constructor(
    private route: ActivatedRoute,
    private openWeatherMapService: OpenWeatherMapService
  ) {}

  ngOnInit() {
    // 現在の天気
    this.currentWeatherObservable = this.route.params.pipe(
      switchMap(param => {
        return this.openWeatherMapService.current(param['city']);
      })
    );

    // １周間の天気
    this.forecastObservable = this.route.params.pipe(
      switchMap(param => {
        return this.openWeatherMapService.forecast(param['city']).pipe(
          map((res: OpenWeatherMap.Forecast) => {
            this.lineChartLabels = [];
            const temp: ForecastChartData = {
              data: [],
              label: '気温'
            };
            const pressure: ForecastChartData = {
              data: [],
              label: '気圧'
            };
            const humidity: ForecastChartData = {
              data: [],
              label: '湿度'
            };

            res.list.forEach((weather: OpenWeatherMap.ThreeHourWeather) => {
              const day = this.unixTimeDatePipe.transform(
                weather.dt,
                'MM/dd HH:mm'
              );
              this.lineChartLabels.push(day);
              temp.data.push(weather.main.temp_max);
              pressure.data.push(weather.main.pressure);
              humidity.data.push(weather.main.humidity);
            });

            this.lineChartTempData = [temp];
            this.lineChartPressureData = [pressure];
            this.lineChartHumidityData = [humidity];
            return res;
          })
        );
      })
    );
  }
}
