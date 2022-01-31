/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html'
})
export class RegistrationPage implements OnInit {
  isLoading = false;
  signUpEmail: string;
  signUpPassword: string;
  constructor(
    private authService: AuthService,
    private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public alertController: AlertController,
  ) {}

  ngOnInit() {
    // this.year = Date.now();
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const user_id = form.value.user_id;
    const password = form.value.password;
    this.isLoading = true;
    this.authService.login(user_id, password).subscribe(
      resData => {
        if (resData.success) {
          console.log('success');
          this.isLoading = false;
          this.router.navigate(['/home']);
        } else {
          this.isLoading = false;
          this.modalAlert(resData.comment_id);
          console.log(resData.comment_id);
        }
      },
      error => {
        this.isLoading = false;
        this.modalAlert('problem_reaching_server');
        console.log('problem_reaching_server (login) :', error);
      }
    );
    form.reset();
  }

  async modalAlert(msg) {
    const alert = await this.alertController.create({
      header: 'alert',
      message: msg,
      backdropDismiss: false,
      buttons: ['OK']
    });
    await alert.present();
  }
}
