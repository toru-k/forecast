import { Component, OnInit } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { Observable } from 'rxjs';

import { AreaService } from './services/area.service';
import { Area } from './shared/models/area';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'forecast';
  public loadingObservable: Observable<boolean>;
  public areasObservable: Observable<Area[]>;

  constructor(
    private loadingService: LoadingService,
    private areaService: AreaService
  ) {}

  ngOnInit() {
    this.loadingObservable = this.loadingService.loading;
    this.areasObservable = this.areaService.getList();
  }
}
