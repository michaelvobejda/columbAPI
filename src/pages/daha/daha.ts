import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { NativeStorage } from '@ionic-native/native-storage';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from 'angularfire2/firestore';


@Component({
  selector: 'page-daha',
  templateUrl: 'daha.html'
})
export class DahaPage {
  // username:string = 'Michael'
  username:string;

  dahasRef: AngularFirestoreCollection<any>;
  dahas: Observable<any[]>;

  constructor(
    public navCtrl: NavController, 
    public alertCtrl: AlertController, 
    private db: AngularFirestore, 
    private nativeStorage: NativeStorage) {

    this.nativeStorage.getItem('username')
    .then(username => { 
        this.username = username;
        return this.nativeStorage.getItem('isVegan')
    })
    .catch(err => {
      console.error(err)
    })

    this.dahasRef = this.db.collection<any>('daha')
    this.dahas = this.dahasRef.valueChanges()
  }


  showPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'New DAHA',
      inputs: [
        {
          name: 'daha',
          placeholder: 'What do you need?'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Request',
          handler: data => {
            const key = this.username + '-' + data.daha
            this.dahasRef.doc(key).set({
              username: this.username,
              daha: data.daha
            })
          }
        }
      ]
    });
    prompt.present();
  }

  delete(daha) {
    const key = daha.username + '-' + daha.daha
    this.dahasRef.doc(key).delete()
  }

  accept(daha) {
    const key = daha.username + '-' + daha.daha
    this.dahasRef.doc(key).delete()
    console.log(this.username + ' has ' + daha.daha + ' for ' + daha.username)
  }

}
