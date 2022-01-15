import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Map', url: '/map', icon: 'map' },
    { title: 'Weather', url: '/weather', icon: 'cloudy-night' },
    { title: 'Air Quality', url: '/airQuality', icon: 'paper-plane' },
    { title: 'Alarms', url: '/alarms', icon: 'warning' },
    { title: 'Statistics', url: '/statistics', icon: 'stats-chart' },
    { title: 'Settings', url: '/settings', icon: 'settings' },
    { title: 'Admins', url: '/admins', icon: 'people' },
  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
  ) {
    this.initialStateApp();
  }

  initialStateApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
