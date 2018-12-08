import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatToolbarModule,
  MatProgressBarModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatCardModule,
  MatInputModule,
  MatDividerModule,
  MatSnackBarModule
} from '@angular/material';
import { HomeComponent } from './components/home/home.component';
import { AreaEditComponent } from './components/area-edit/area-edit.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import { UnixTimeDatePipe } from './shared/pipes/unix-time-date.pipe';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './shared/interceptor/loading-interceptor';

import { ChartsModule } from 'ng2-charts/ng2-charts';

import { registerLocaleData } from '@angular/common';
import localeJa from '@angular/common/locales/ja';
import { ChartComponent } from './components/chart/chart.component';

import { ForecastErrorHandler } from './services/error-handler';
import { HttpErrorInterceptor } from './services/http-error-interceptor';
import { MessageComponent } from './components/message/message.component';

registerLocaleData(localeJa, 'ja');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AreaEditComponent,
    ForecastComponent,
    UnixTimeDatePipe,
    ChartComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatDividerModule,
    MatSnackBarModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: ForecastErrorHandler },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
