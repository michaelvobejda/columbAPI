import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { NativeStorage } from '@ionic-native/native-storage';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from 'angularfire2/firestore';


@Component({
  selector: 'page-food',
  templateUrl: 'food.html'
})
export class FoodPage {
  username:string = 'Michael'
  isVegan:boolean = true
  isGF:boolean = true

  platesRef: AngularFirestoreCollection<any>;
  plates: Observable<any[]>;
  needPlate:boolean;

  constructor(public navCtrl: NavController, private nativeStorage: NativeStorage, private db: AngularFirestore) {
    // this.nativeStorage.getItem('username')
    // .then(username => { 
    //     this.username = username;
    //     return this.nativeStorage.getItem('isVegan')
    // })
    // .then(isVegan => {
    //   this.isVegan = isVegan
    //   return this.nativeStorage.getItem('isGF')
    // })
    // .then(isGF => {
    //   this.isGF = isGF
    // })
    // .catch(err => {
    //   console.error(err)
    // })

    this.platesRef = this.db.collection<any>('plates')
    this.plates = this.platesRef.valueChanges()
  }

  ionViewDidLoad() {
  }

  plateChanged() {
    if (this.needPlate) {
      this.platesRef.doc(this.username)
      .set({
        username: this.username,
        isVegan: this.isVegan,
        isGF: this.isGF
      })
    } else {
      this.platesRef.doc(this.username).delete()
    }
  }
}
