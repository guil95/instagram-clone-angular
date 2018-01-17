import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  ngOnInit(){
    const config = {
      apiKey: "AIzaSyAjjYZ2D1U7hZKwKCCbvk3vYT-ny5HLKZw",
      authDomain: "jta-instagram-clone-3cddd.firebaseapp.com",
      databaseURL: "https://jta-instagram-clone-3cddd.firebaseio.com",
      projectId: "jta-instagram-clone-3cddd",
      storageBucket: "jta-instagram-clone-3cddd.appspot.com",
      messagingSenderId: "803901513462"
    };
    
    firebase.initializeApp(config);
  }
}
