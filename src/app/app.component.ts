// import mongoose from 'mongoose'

import { Component } from '@angular/core';
import { Platform, Tabs } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { FcmProvider } from '../providers/fcm/fcm'

import { ToastController } from 'ionic-angular'
import { tap } from 'rxjs/operators'

// import { LatePlate } from '../models/'


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    private nativeStorage: NativeStorage,
    public fcm: FcmProvider, 
    public toastCtrl: ToastController) {


    // Check if logged in
    // this.nativeStorage.getItem('username')
    // .then(
    //   username => {
    //     console.log('username:', username)
    //     this.rootPage = TabsPage
    //   },
    //   error => this.rootPage = LoginPage
    // )

    this.rootPage = TabsPage

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ionViewDidLoad() {

    console.log('hello')
    
    // Get a FCM token
    this.fcm.getToken()

    this.fcm.listenToNotifications().pipe(
      tap(msg => {
        const toast = this.toastCtrl.create({
          message: msg.body,
          duration: 3000
        })
        toast.present()
      })
    )
    .subscribe()
  }
}

