import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { TabsPage } from '../tabs/tabs';
import { WelcomePage } from '../welcome/welcome'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  @ViewChild('name') nameField: any;
  private username: string;
  public isVegan: boolean = false;
  public isGF: boolean = false;

  constructor(private navCtrl: NavController, private nativeStorage: NativeStorage) {}

  ionViewDidLoad() {
    setTimeout(() => {
      this.nameField.setFocus();
    }, 150);
  }

  login() {

    this.nativeStorage.setItem('username', this.username)
    .then(() => this.nativeStorage.setItem('isVegan', this.isVegan))
    .then(() => this.nativeStorage.setItem('isGF', this.isGF))
    .then(() => {
        console.log('Stored item!')
        this.navCtrl.push(WelcomePage)
        setTimeout(() => {
          // this.navCtrl.popToRoot();
          // might try this instead
          this.navCtrl.push(TabsPage);
        }, 1000);
      })
    .catch(error => console.error('Error storing item', error))
  }

}