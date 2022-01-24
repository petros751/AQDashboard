/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Admin } from '../../admin.model';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { DataStorageService } from '../../../shared/data-storage.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import { map } from 'rxjs/operators';
import { userInfo } from 'os';

@Component({
  selector: 'app-add-user-modal-page',
  templateUrl: './add-admin-modal.component.html'
})
export class AddAdminModalComponent implements OnInit, OnDestroy {
  @Input() currentUser: any;
  public newUser = {} as Admin;
  public languages = [];
  public user: any;
  public newAdminForm: FormGroup;
  public isSubmitted = false;
  public loading = false;
  public allStores: any;
  public subscriptionStores: Subscription;
  public allPermissions: boolean;
  public allStoresPermissions: boolean;
  public notSuperAdmin: boolean;

  constructor(
    public modalCtrl: ModalController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private dataStorageService: DataStorageService,
    public formBuilder: FormBuilder,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('userData')).user;
    console.log(this.user);

    if (this.user.permissions[0] === '*' && (this.user.stores === ['*'] || _.isEmpty(this.user.stores))) {
      this.notSuperAdmin = false;
    } else {
      this.notSuperAdmin = true;
    }
    this.subscriptionStores = this.store
    .select('auth')
    .pipe(map(authState => authState.user.stores))
    .subscribe(stores => {
      this.allStores = stores;
    });
    this.newAdminForm = new FormGroup({
      superadmin_id: new FormControl(),
      password: new FormControl(),
      selectedStores: new FormControl(),
      permissions: new FormControl(),
      language_code: new FormControl(),
      allPermissions: new FormControl(),
      allStoresPermissions: new FormControl()
    });
    this.newAdminForm = this.formBuilder.group({
      superadmin_id: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      selectedStores: [''],
      permissions: [''],
      language_code: ['', Validators.required],
      allPermissions: [''],
      allStoresPermissions: ['']
    });
    this.newUser.language_code = 'el';
    this.newUser.permissions = ['*'];
    this.newUser.stores = [];
    this.newUser.selectedStores = ['*'];
    this.allPermissions = true;
    this.allStoresPermissions = true;
  }

  get errorControl() {
    return this.newAdminForm.controls;
  }

  async submitForm() {
    this.isSubmitted = true;
    // if (!this.newAdminForm.valid) {
    //   console.log('please provide all the required values!');
    //   return false;
    // } else {
    //   const loading = await this.loadingController.create({
    //     message: 'loading'
    //   });
    //   loading.present();
    //   this.newUser.type = 'create';
    //   console.log(this.newUser);
    //   // if (this.newUser.selectedStores !== ["*"] || !this.newUser.selectedStores.lenght) {
    //   //   for (let index = 0; index < this.newUser.selectedStores.length; index++) {
    //   //     const fullStore = _.find(this.allStores, {'store_id': this.newUser.selectedStores[index]})
    //   //     const finalStore = _.pick(fullStore, ['store_id', 'group'])
    //   //     console.log(finalStore);
    //   //     this.newUser.stores.push(finalStore)
    //   //   }
    //   // }
    //   this.newUser.stores = _.cloneDeep(this.newUser.selectedStores);
    //   console.log(this.newUser);
    //   this.dataStorageService.createAdmin(this.newUser).subscribe(
    //     async res => {
    //       loading.dismiss();
    //       if (!res.success) {
    //         const alert = await this.alertController.create({
    //           header: res.comment_id,
    //           backdropDismiss: false,
    //           buttons: ['OK']
    //         });
    //         await alert.present();
    //       } else {
    //           this.modalCtrl.dismiss();
    //       }
    //     },
    //     async error => {
    //       await loading.dismiss();
    //       const alert = await this.alertController.create({
    //         header: 'alert',
    //         message: 'problem_reaching_server',
    //         backdropDismiss: false,
    //         buttons: ['OK']
    //       });
    //       await alert.present();
    //       console.log('problem_reaching_server', error);
    //     }
    //   );
    // }
  }

  ionChangePermssions() {
    if (this.allPermissions) {
      this.newUser.permissions = ['*'];
    } else {
      this.newUser.permissions = [];
    }
  }

  ionChangeStores() {
    if (this.allStoresPermissions) {
      this.newUser.stores = ['*'];
    } else {
      this.newUser.stores = [];
    }
  }

  ngOnDestroy() {

  }
}
