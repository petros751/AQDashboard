import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import * as fromApp from './store/app.reducer';

import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { AdminsPage } from './admins/admins.page';
import { AlarmsPage } from './alarms/alarms.page';
import { MapPage } from './map/map.page';
import { StatisticsPage } from './statistics/statistics.page';
import { WeatherPage } from './weather/weather.page';
import { AuthPage } from './auth/auth.page';

@NgModule({
  declarations: [
    AppComponent,
    AdminsPage,
    AlarmsPage,
    MapPage,
    StatisticsPage,
    WeatherPage,
    AuthPage,
  ],
  entryComponents: [],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    HttpClientModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
