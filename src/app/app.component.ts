// import mongoose from 'mongoose'

import { Component } from '@angular/core';
import { Platform, Tabs } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

// import { LatePlate } from '../models/'


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private nativeStorage: NativeStorage) {

    // Set up mLab database
    // mongoose.connect(MONGO_URL)
    // mongoose.connection.on('open', () => {
    //   this._DB = mongoose.connection.db
    //   LatePlate.model.deleteMany({})
    //   .then(() => {
    //     LatePlate.model({ name: 'Michael' }).save()
    //     LatePlate.model({ name: 'Emily' }).save()
    //     LatePlate.model({ name: 'Ben' }).save()
    //   })
    // })

    // mongoose.connection.on('error',  err => {
    //   if (err) {
    //       console.log('Failed to connect to database.')
    //   }
    // })

    // Check if logged in
    this.nativeStorage.getItem('username')
    .then(
      username => {
        console.log('username:', username)
        this.rootPage = TabsPage
      },
      error => this.rootPage = LoginPage
    )

    // this.rootPage = TabsPage

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

