import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MapPage } from './map/map.page';
import { WeatherPage } from './weather/weather.page';
import { AirQualityPage } from './airQuality/airQuality.page';
import { AlarmsPage } from './alarms/alarms.page';
import { StatisticsPage } from './statistics/statistics.page';
import { AdminsPage } from './admins/admins.page';
import { AuthPage } from './auth/auth.page';
import { SettingsPage } from './settings/settings.page';
import { AuthGuard } from './auth/auth.guard';
import { RegistrationPage } from './registration/registration.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthPage,
  },
  {
    path: 'registration',
    component: RegistrationPage,
  },
  {
    path: 'map',
    component: MapPage,
    canActivate: [AuthGuard]
  },
  {
    path: 'weather',
    component: WeatherPage,
    canActivate: [AuthGuard]
  },
  {
    path: 'airQuality',
    component: AirQualityPage,
    canActivate: [AuthGuard]
  },
  {
    path: 'alarms',
    component: AlarmsPage,
    canActivate: [AuthGuard]
  },
  {
    path: 'statistics',
    component: StatisticsPage,
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    component: SettingsPage,
    canActivate: [AuthGuard]
  },
  {
    path: 'admins',
    component: AdminsPage,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
