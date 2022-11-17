/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['auth.page.scss']
})
export class AuthPage implements OnInit {
  isLoading = false;
  year: number;
  public user_id = '';
  public password = '';
  public loginForm: FormGroup;
  constructor(
    public alertController: AlertController,
    public formBuilder: FormBuilder,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
  ) {}

  ngOnInit() {
    this.year = Date.now();
    this.loginForm = new FormGroup({ user_id: new FormControl(), password: new FormControl() });
    this.loginForm = this.formBuilder.group({
      user_id: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    this.isLoading = true;
    // this.authService.login(this.user_id, this.password).subscribe(
    //   resData => {
    //     if (resData && resData.success) {
    //       console.log('success');
    //       this.isLoading = false;
    //       this.router.navigate(['/home']);
    //     } else if(!resData || !resData.success){
    //       this.isLoading = false;
    //       this.modalAlert(resData && resData.comment_id ? resData.comment_id : 'general_error');
    //     }
    //   },
    //   error => {
    //     this.isLoading = false;
    //     this.modalAlert('problem_reaching_server');
    //     console.log('problem_reaching_server (login) :', error);
    //   }
    // );
    // this.loginForm.reset();
  }

  async modalAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: msg,
      backdropDismiss: false,
      buttons: ['OK']
    });
    await alert.present();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
