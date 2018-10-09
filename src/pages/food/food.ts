import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';



@Component({
  selector: 'page-food',
  templateUrl: 'food.html'
})
export class FoodPage {
  username:string = 'Michael'
  isVegan:boolean;
  isGF: boolean;
  // platesRef: AngularFireDatabase<any>;
  plates: AngularFireList<any>;
  needPlate:boolean;

  constructor(public navCtrl: NavController, private nativeStorage: NativeStorage, private db: AngularFireDatabase) {
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
    .catch(err => console.log('Food - Error in retrieving values from native storage.'))

    // this.platesRef = db.collection('plates');
    // // Use snapshotChanges().map() to store the key
    // this.plates = this.platesRef.snapshotChanges().pipe(
    //   map(changes => 
    //     changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    //   )
    // );
    // this.platesRef = db.list('plates')
    // this.plates = this.db.list('plates').valueChanges();
    console.log('plates:', this.plates)
    // console.log('plates ref:', JSON.stringify(this.platesRef))
  }

  ionViewDidLoad() {
  }

  changePlate() {
    console.log('changePlate() called! username:', this.username)
    // if (this.needPlate) {
    //   this.platesRef.child(this.username).setValue({
    //     username: this.username,
    //     isVegan: this.isVegan,
    //     isGF: this.isGF
    //   });
    // } else {
    //   this.platesRef.remove(this.username)
    // }
  }
}
