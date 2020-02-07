declare var cordova: any;

import { Component } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  private pageIsLoading = true;
  private loading = true;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private toastCtrl: ToastController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.loadSite().then((resp: any) => {
        this.splashScreen.hide();
        this.loading = false;
        this.pageIsLoading = false;
        if (resp !== true) {
          this.errorToast();
        }
      });
    });
  }

  loadSite() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      try {
        const browserOptions = 'clearcache=yes,location=no,zoom=no,usewkwebview=yes';
        const browser = cordova.InAppBrowser.open('http://exchange.unyti.org/', '_blank', browserOptions);
        browser.show();
        resolve(true);
      } catch (err) {
        reject(err);
      }
    });
  }

  reload() {
    this.loading = true;
    this.loadSite().then((resp: any) => {
      this.loading = false;
      if (resp !== true) {
        this.errorToast();
      }
    });
  }

  async errorToast() {
    const toast = await this.toastCtrl.create({
      message: 'There was a problem loading. Please restart or try again later.',
      duration: 3000,
      color: 'error'
    });
    await toast.present();
  }
}
