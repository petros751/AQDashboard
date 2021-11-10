import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alarms',
  templateUrl: './alarms.page.html',
})
export class AlarmsPage implements OnInit {
  public folder: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log('AlarmsPage');
  }

}
