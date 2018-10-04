import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';


@Component({
  selector: 'page-food',
  templateUrl: 'food.html'
})
export class FoodPage {
  username:string = 'Michael'
  platesRef: AngularFireList<any>;
  plates: Observable<any[]>;
  needPlate:boolean;

  constructor(public navCtrl: NavController, private nativeStorage: NativeStorage, private db: AngularFireDatabase) {
    // this.nativeStorage.getItem('username')
    // .then(
    //   username => { 
    //     this.username = username 
    //     console.log('Retrieved username: ', this.username)
    //   },
    //   err => console.error('Cannot find username in native storage.')
    // );
    // console.log('made it here')
    this.platesRef = db.list('/plates');
    // // Use snapshotChanges().map() to store the key
    this.plates = this.platesRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    console.log('also made it here')
  }

  ionViewDidLoad() {
  }

  plateChanged() {
    // console.log('username:', this.username)
    // if (this.needPlate) {
    //   console.log('fuck this')
    //   // this.platesRef.child(this.username).setValue(this.username);
    // } else {
    //   this.platesRef.remove(this.username)
    // }
  }
}
