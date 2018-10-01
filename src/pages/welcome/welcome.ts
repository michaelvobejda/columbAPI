import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';


/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  private username: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public nativeStorage: NativeStorage) {
    this.nativeStorage.getItem('username')
    .then(
      username => this.username = username,
      error => console.error('Something went wrong.')
    ) 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

}
