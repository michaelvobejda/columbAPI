import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';



@Component({
  selector: 'page-food',
  templateUrl: 'food.html'
})
export class FoodPage {
  username:string = 'Michael'
  isVegan:boolean;
  isGF: boolean;
  platesRef: AngularFirestore<any>;
  plates: Observable<any[]>;
  needPlate:boolean;

  constructor(public navCtrl: NavController, private nativeStorage: NativeStorage, db: AngularFirestore) {
    this.nativeStorage.getItem('username')
    .then(username => {
      this.username = username
      return this.nativeStorage.getItem('isVegan')
    })
    .then(isVegan => {
      this.isVegan = isVegan;
      return this.nativeStorage.getItem('isGF')
    })
    .then(isGF => {
      this.isGF = isGF;
    })
    .catch(err => console.error('Food - Error in retrieving values from native storage.'))

    // this.platesRef = db.collection('plates');
    // // Use snapshotChanges().map() to store the key
    // this.plates = this.platesRef.snapshotChanges().pipe(
    //   map(changes => 
    //     changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    //   )
    // );
    this.platesRef = db.list('plates')
    this.plates = this.platesRef.valueChanges()
  }

  ionViewDidLoad() {
  }

  changePlate() {
    console.log('changePlate() called! username:', this.username)
    if (this.needPlate) {
      this.platesRef.child(this.username).setValue({
        username: this.username,
        isVegan: this.isVegan,
        isGF: this.isGF
      });
    } else {
      this.platesRef.remove(this.username)
    }
  }
}
