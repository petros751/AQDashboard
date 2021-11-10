import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Map', url: '/map', icon: 'trash' },
    { title: 'Weather', url: '/weather', icon: 'mail' },
    { title: 'Air Quality', url: '/aq', icon: 'paper-plane' },
    { title: 'Alarms', url: '/alarms', icon: 'heart' },
    { title: 'Statistics', url: '/statistics', icon: 'warning' },
    { title: 'Admins', url: '/admins', icon: 'archive' },
  ];
  constructor() {}
}
