/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import { DataStorageService } from '../../../shared/data-storage.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import * as selectors from '../../../store/app.selectors';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { promise } from 'protractor';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-admin-model',
  templateUrl: './edit-admin-modal.component.html',
  styleUrls: ['./edit-admin-modal.component.scss']
})
export class EditAdminModalComponent implements OnInit, OnDestroy {
  @Input() superadmin_id;
  public editAdmin: any = null;
  public superadmin: boolean;
  public user: any;
  public editAdminForm: FormGroup = null;
  public isSubmitted = false;
  public currentUserUserId: string;
  public loading = false;
  public loadingLogin = false;
  public loadingCredentials = false;
  public allStores: any;
  subscription: Subscription;
  public subscriptionStores: Subscription;
  public allPermissions: boolean;
  public allStoresPermissions: boolean;
  public notSuperAdmin: boolean;
  public all: boolean;

  constructor(
    public modalCtrl: ModalController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private dataStorageService: DataStorageService,
    private store: Store<fromApp.AppState>,
    public formBuilder: FormBuilder,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    console.log(this.superadmin_id);

    this.currentUserUserId = JSON.parse(localStorage.getItem('userData')).user.user_id;
    this.user = JSON.parse(localStorage.getItem('userData')).user;
    if (this.user.permissions[0] === '*' && this.user.stores[0] === '*') {
      this.notSuperAdmin = false;
    } else {
      this.notSuperAdmin = true;
    }
    this.subscription = this.store.select(selectors.getItemByAdminId(this.superadmin_id)).subscribe(editAdmin => {
      if (editAdmin) {
        console.log(editAdmin);
        this.editAdmin = _.cloneDeep(editAdmin);
        this.editAdmin.stores = [];
        this.editAdmin.permissions = [];
        for (let index = 0; index < editAdmin.stores.length; index++) {
          console.log(editAdmin.stores[index]);
          if (editAdmin.stores[index] === '*') {
            this.allStoresPermissions = true;
            this.editAdmin.stores = ['*'];
          } else {
            this.allStoresPermissions = false;
            this.editAdmin.stores.push(editAdmin.stores[index]);
          }
        }
        for (let index = 0; index < editAdmin.permissions.length; index++) {
          console.log(editAdmin.permissions[index]);
          if (editAdmin.permissions[index] === '*') {
            this.allPermissions = true;
            this.editAdmin.permissions = ['*'];
          } else {
            this.allPermissions = false;
            this.editAdmin.permissions.push(editAdmin.permissions[index]);
          }
        }
        console.log(this.editAdmin.permissions);
      }
    });
    this.subscriptionStores = this.store
    .select('auth')
    .pipe(map(authState => authState.user.stores))
    .subscribe(stores => {
      this.allStores = stores;
    });
    this.editAdminForm = new FormGroup({
      superadmin_id: new FormControl(),
      stores: new FormControl(),
      permissions: new FormControl(),
      language_code: new FormControl(),
      allPermissions: new FormControl(),
      allStoresPermissions: new FormControl()
    });
    this.editAdminForm = this.formBuilder.group({
      superadmin_id: ['', [Validators.required, Validators.minLength(4)]],
      stores: [''],
      permissions: [''],
      language_code: ['', Validators.required],
      allPermissions: [''],
      allStoresPermissions: ['']
    });
  }

  get errorControl() {
    return this.editAdminForm.controls;
  }

  async submitForm() {
    this.isSubmitted = true;
    console.log(this.editAdmin);

    if ( _.isEmpty(this.editAdmin.permissions))
    {
      console.log(this.editAdmin.permissions);

      console.log('permissions are empty');

      const alert_permission = await this.alertController.create({
        header:'alert',
        message: 'admin-panel.no_permissions_selected',
        buttons: ['OK']
      });
      await alert_permission.present();
      return false;
    }
    if (!this.editAdminForm.valid) {
      console.log('please provide all the required values!');
      const alert = await this.alertController.create({
        header: 'alert',
        message: 'please_provide_all_the_required_values',
        backdropDismiss: false,
        buttons: ['OK']
      });
      await alert.present();
      return false;
    } else {
      const loading = await this.loadingController.create({
        message: 'loading'
      });
      loading.present();
      this.editAdmin.type = 'update';
      console.log(this.editAdmin);

      return await this.dataStorageService.updateAdmin(this.editAdmin).then(
        async res => {
          loading.dismiss();
          if (!res.success) {
            const alert = await this.alertController.create({
              header: 'alert',
              message: res.comment_id,
              backdropDismiss: false,
              buttons: ['OK']
            });
            await alert.present();
            return Promise.resolve({
              success: false
            });
          } else {
            this.modalCtrl.dismiss();
            return Promise.resolve({
              success: true
            });
          }
        },
        async error => {
          await loading.dismiss();
          const alert = await this.alertController.create({
            header: 'alert',
            message: 'problem_reaching_server',
            backdropDismiss: false,
            buttons: ['OK']
          });
          await alert.present();
          console.log('problem_reaching_server', error);
          return Promise.resolve({
            success: false
          });
        }
      );
    }
  }
  async newPasswordPopUp() {
    const alert = await this.alertController.create({
      header: 'admin-panel.password',
      backdropDismiss: false,
      inputs: [
        {
          name: 'new_password',
          type: 'text',
          placeholder: 'admin-panel.enter_password'
        }
      ],
      buttons: [
        {
          text: 'select_cancel',
          role: 'cancel',
          handler: () => {}
        },
        {
          text:'select_ok',
          handler: data => {
            if (!data.new_password || data.new_password.length < 4) {
              this.warningToast('admin-panel.password_warning');
              return false;
            } else {
              this.editAdmin.password = data.new_password;
              this.submitForm();
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async warningToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      position: 'top',
      cssClass: 'ion-text-center',
      duration: 2000
    });
    toast.present();
  }

  async newPasswordSmsSend() {
    if(this.currentUserUserId === this.editAdmin.user_id && !this.superadmin){
      return this.warningToast('action_only_superadmin');
    }
    const response_submit: any = await this.submitForm();
    if (!_.isEmpty(response_submit) && response_submit.success) {
      this.loadingCredentials = true;
    //   this.dataStorageService.sendUserCredentials({ user_id: this.editAdmin.user_id }).subscribe(
    //     async resData => {
    //       if (!resData.success) {
    //         const alert = await this.alertController.create({
    //           header: this.translate.instant("alert"),
    //           message: this.translate.instant(resData.comments),
    //           backdropDismiss: false,
    //           buttons: ["OK"]
    //         });
    //         await alert.present();
    //         this.loadingCredentials = false;
    //       } else {
    //         this.loadingCredentials = false;
    //       }
    //     },
    //     async error => {
    //       const alert = await this.alertController.create({
    //         header: this.translate.instant("alert"),
    //         message: this.translate.instant("problem_reaching_server"),
    //         backdropDismiss: false,
    //         buttons: ["OK"]
    //       });
    //       await alert.present();
    //       console.log("problem_reaching_server", error);
    //       this.loadingCredentials = false;
    //     }
    //   );
    }
  }

  ionChangePermssions() {
    if (this.allPermissions) {
      this.editAdmin.permissions = ['*'];
    } else {
      this.editAdmin.permissions = [];
    }
  }

  ionChangeStores() {
    if (this.allStoresPermissions) {
      this.editAdmin.stores = ['*'];
    } else {
      this.editAdmin.stores = [];
    }
  }

  ngOnDestroy() {
  }
}
