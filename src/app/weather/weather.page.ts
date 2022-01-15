import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { map, auditTime, distinctUntilChanged } from 'rxjs/operators';
import { DataStorageService } from '../shared/data-storage.service';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./wether.page.scss']
})
export class WeatherPage {
  public folder: string;
  subscription: Subscription;
  loading = false;
  public currentWether: number;
  public dateTime: string;
  public currentFeelLikeWether: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private dataStorageService: DataStorageService,
    private store: Store<fromApp.AppState>,
    ) { }

  ionViewDidEnter() {
    this.subscription = this.store
    .select('weather')
    .pipe(auditTime(500))
    .pipe(distinctUntilChanged())
    .pipe(map(weatherState => weatherState.currentWeather))
    .subscribe(currentWeather => {
      console.log(currentWeather);
      // if (customers && !_.isEqual(this.customers, customers)) {
      //   this.customers = _.cloneDeep(_.orderBy(customers, 'timestamp', 'desc'));
      //   this.loading = false;
      // }
    });
    this.fetchCurrentWeather();
    this.currentWether = 17;
    const today = new Date();
    const date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    const time = today.getHours() + ':' + today.getMinutes();
    this.dateTime = date+' '+time;
    this.currentFeelLikeWether = 9;
  }

  async fetchCurrentWeather() {
    this.dataStorageService.fetchCurrentWeather()
    .subscribe({
      next: () =>
        async resData => {
          if (!resData || !resData.success) {
            const alert = await this.alertController.create({
              header: 'alert',
              message: resData.comment_id,
              backdropDismiss: false,
              buttons: ['OK']
            });
            await alert.present();
          }
        },
      error: () =>
        async (error) => {
          const alert = await this.alertController.create({
            header: 'alert',
            message: 'problem_reaching_server',
            backdropDismiss: false,
            buttons: ['OK']
          });
          await alert.present();
          console.log('problem_reaching_server', error);
        },
      complete: () => this.loading = false
    }
    );
  }

}
