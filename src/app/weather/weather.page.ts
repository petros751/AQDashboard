import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { map, auditTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
})
export class WeatherPage implements OnInit {
  public folder: string;
  subscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    ) { }

  ngOnInit() {
    this.subscription = this.store
    .select('weather')
    .pipe(auditTime(500))
    .pipe(distinctUntilChanged())
    .pipe(map(weatherState => weatherState.statistics))
    .subscribe(weathers => {
      console.log(weathers);
      // if (customers && !_.isEqual(this.customers, customers)) {
      //   this.customers = _.cloneDeep(_.orderBy(customers, 'timestamp', 'desc'));
      //   this.loading = false;
      // }
    });
  // this.fetchCustomersFlow('', true);
  }

}
