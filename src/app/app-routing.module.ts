import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MapPage } from './map/map.page';
import { WeatherPage } from './weather/weather.page';
import { AirQualityPage } from './airQuality/airQuality.page';
import { AlarmsPage } from './alarms/alarms.page';
import { StatisticsPage } from './statistics/statistics.page';
import { AdminsPage } from './admins/admins.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'map',
    component: MapPage
  },
  {
    path: 'weather',
    component: WeatherPage,
    // canActivate: [AuthGuard]
  },
  {
    path: 'air',
    component: AirQualityPage,
    // canActivate: [AuthGuard]
  },
  {
    path: 'alarms',
    component: AlarmsPage,
    // canActivate: [AuthGuard]
  },
  {
    path: 'statistics',
    component: StatisticsPage,
  },
  {
    path: 'admins',
    component: AdminsPage,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
