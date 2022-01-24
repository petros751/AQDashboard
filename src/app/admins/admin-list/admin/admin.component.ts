/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, Input } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DataStorageService } from '../../../shared/data-storage.service';
import { Admin } from '../../admin.model';
import { ModalController, LoadingController } from '@ionic/angular';
import { EditAdminModalComponent } from '../../modal-components/edit-admin-modal/edit-admin-modal.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminPage implements OnInit {
  @Input() admin: Admin;
  modal: HTMLIonModalElement;
  color: string;
  currentUserUserId: string;
  disabledDelete: boolean;

  constructor(
    private loadingController: LoadingController,
    public alertController: AlertController,
    private dataStorageService: DataStorageService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.currentUserUserId = JSON.parse(localStorage.getItem('userData')).user.superadmin_id;
    if (this.admin.superadmin_id === this.currentUserUserId) {
      this.color = 'danger';
      this.disabledDelete = true;
    }
  }


  async onDeleteUser() {
    const alert = await this.alertController.create({
      header:'delete_user',
      message: 'delete_message',
      backdropDismiss: false,
      buttons: [{
        text: 'cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blash) => { }
      }, {
        text: 'delete',
        handler: async () => {
          const loading = await this.loadingController.create({
            message: 'loading'
          });
          loading.present();
          this.admin.type = 'delete';
          console.log(this.admin);

          this.dataStorageService.deleteAdmin(this.admin).subscribe(
          async res => {
            loading.dismiss();
            if (!res.success) {
              const alert = await this.alertController.create({
                message: res.comment_id,
                backdropDismiss: false,
                buttons: ['OK']
              });
              await alert.present();
            }
          }, async error => {
            const alert = await this.alertController.create({
              header: 'alert',
              message: 'problem_reaching_server',
              backdropDismiss: false,
              buttons: ['OK']
            });
            await alert.present();
            console.log('problem_reaching_server', error);
          });
        }
      }
      ]
    });
    await alert.present();
  }

  async onEditUser() {
    return await this.showEditAdminModal();
  }

  private async showEditAdminModal() {
    this.modal = await this.modalController.create({
      component: EditAdminModalComponent,
      componentProps: { superadmin_id: _.cloneDeep(this.admin.superadmin_id) },
      backdropDismiss: false
    });
    return await this.modal.present();
  }
}
