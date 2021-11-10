import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-air-quality',
  templateUrl: './airQuality.page.html',
})
export class AirQualityPage implements OnInit {
  public folder: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log('AirQualityPage');
  }

}
