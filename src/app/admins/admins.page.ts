/* eslint-disable @typescript-eslint/member-ordering */
import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AlertController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { AddAdminModalComponent } from './modal-components/add-admin-modal/add-admin-modal.component';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.page.html',
})
export class AdminsPage {
  modal: HTMLIonModalElement;
  private userSubscription: Subscription;
  currentUser = null;

  constructor(
    private dataStorageService: DataStorageService,
    private store: Store<fromApp.AppState>,
    private alertController: AlertController,
    private modalController: ModalController
  ) {}

  ionViewDidEnter() {
    this.dataStorageService.fetchUsers();
    this.userSubscription = this.store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        if (user && user.user ? !!user.token : false) {
          this.currentUser = user;
        } else {
          this.currentUser = null;
        }
      });
  }

  async addUser() {
    return await this.showUserModal();
  }

  private async showUserModal() {
    this.modal = await this.modalController.create({
      component: AddAdminModalComponent,
      cssClass: 'add-user-modal-page',
      backdropDismiss: false,
      componentProps: {
        currentUser: _.cloneDeep(this.currentUser.user)
      }
    });
    return await this.modal.present();
  }

  ionViewDidLeave() {
    this.dataStorageService.ClearAdminUsers();
    this.userSubscription.unsubscribe();
  }
}
