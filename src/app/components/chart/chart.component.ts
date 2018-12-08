import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ForecastChartData } from '../../shared/models/forecast-chart-data';
import { UnixTimeDatePipe } from '../../shared/pipes/unix-time-date.pipe';
import { OpenWeatherMap } from '../../shared/models/open-weather-map';
import { OpenWeatherMapService } from '../../services/open-weather-map.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
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
    // １周間の天気
    this.forecastObservable = this.route.params.pipe(
      switchMap(param => {
        return this.openWeatherMapService.forecast(param['city'], 39).pipe(
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
