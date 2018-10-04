import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';



@Component({
  selector: 'page-jobs',
  templateUrl: 'jobs.html'
})
export class JobsPage {


  constructor(public navCtrl: NavController, private http: HTTP) {}

  ionViewDidLoad() {
  }

  
  

}
