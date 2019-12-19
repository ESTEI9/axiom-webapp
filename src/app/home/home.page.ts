import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private iab: InAppBrowser,
    private splashscreen: SplashScreen
  ) {}

  ngOnInit() {
    this.loadSite();
  }

  loadSite() {
    const browserOptions = 'clearcache=yes,location=no,zoom=no';
    const browser = this.iab.create('http://exchange.unyti.org/', '_blank', browserOptions);
    const loadstart = browser.on('loadstart').subscribe();
    const loadstop = browser.on('loadstop').subscribe(() => {
      this.splashscreen.hide();
      loadstart.unsubscribe();
      loadstop.unsubscribe();
    });
  }

}
