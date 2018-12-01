import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AreaEditComponent } from './components/area-edit/area-edit.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'area/edit', component: AreaEditComponent },
  { path: 'forecast/:city', component: ForecastComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
