import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Map', url: '/folder/Map', icon: 'trash' },
    { title: 'Weather', url: '/folder/Weather', icon: 'mail' },
    { title: 'Air Quality', url: '/folder/AQ', icon: 'paper-plane' },
    { title: 'Alarms', url: '/folder/Alarms', icon: 'heart' },
    { title: 'Statistics', url: '/folder/Statistics', icon: 'warning' },
    { title: 'Admins', url: '/folder/Admins', icon: 'archive' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
