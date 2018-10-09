import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login'
import { FoodPage } from '../pages/food/food';
import { JobsPage } from '../pages/jobs/jobs';
import { DahaPage } from '../pages/daha/daha';
import { TabsPage } from '../pages/tabs/tabs';
import { WelcomePage } from '../pages/welcome/welcome'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';
import { HTTP } from '@ionic-native/http';
import { Push } from '@ionic-native/push';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from '@angular/fire/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyAhXRAW9h0Eb4Xm3Gf4xiEnUhM9A3kBEmU",
  authDomain: "columbapi-431e5.firebaseapp.com",
  databaseURL: "https://columbapi-431e5.firebaseio.com",
  projectId: "columbapi-431e5",
  storageBucket: "columbapi-431e5.appspot.com",
  messagingSenderId: "14669114702"
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    FoodPage,
    JobsPage,
    DahaPage,
    TabsPage,
    WelcomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    FoodPage,
    JobsPage,
    DahaPage,
    TabsPage,
    WelcomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NativeStorage,
    HTTP,
    AngularFireDatabase,
    AngularFirestore,
    Push
  ]
})
export class AppModule {}
