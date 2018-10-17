import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, Toast } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { tap } from 'rxjs/operators'


import { TabsPage } from '../tabs/tabs';
import { WelcomePage } from '../welcome/welcome'

import { FcmProvider } from '../../providers/fcm/fcm'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  @ViewChild('name') nameField: any;
  private username: string;
  public isVegan: boolean = false;
  public isGF: boolean = false;

  constructor(
    public navCtrl: NavController,
    private nativeStorage: NativeStorage,
    public fcm: FcmProvider,
    public toastCtrl: ToastController) {}

  ionViewDidLoad() {
    setTimeout(() => {
      this.nameField.setFocus();
    }, 150);

    // Get an FCM token
    this.fcm.getToken()
    console.log('got token')

    this.fcm.listenToNotifications().pipe(
      tap(msg => {
        console.log('test')
        const toast = this.toastCtrl.create({
          message: msg.body,
          duration: 3000
        })

        toast.present()
        console.log('presented toast')
      })
    )
    
  }

  login() {

    this.nativeStorage.setItem('username', this.username.trim())
    .then(() => this.nativeStorage.setItem('isVegan', this.isVegan))
    .then(() => this.nativeStorage.setItem('isGF', this.isGF))
    .then(() => {
        console.log('Stored item!')
        this.navCtrl.push(WelcomePage)
        setTimeout(() => {
          // this.navCtrl.popToRoot();
          // might try this instead
          this.navCtrl.push(TabsPage);
        }, 2000);
      })
    .catch(error => console.error('Error storing item', error))
  }

}