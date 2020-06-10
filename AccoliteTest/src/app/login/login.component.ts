import { Component,OnInit,ElementRef } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import { NgZone } from '@angular/core';
import {UserServiceService} from '../user-service.service'
declare const gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  isSignedIn: boolean;

  user:any = {};


constructor(private router: Router, private element: ElementRef,public zone: NgZone,private userService: UserServiceService) {
  console.log('ElementRef: ', this.element);
  this.isSignedIn = false;
  this.googleInit();
  
 }


 
  /*
  login() : void {
    if(this.username == 'admin' && this.password == 'admin'){
     this.router.navigate(["user"]);
    }else {
      alert("Invalid credentials");
    }
  }
  onSignIn(googleUser) : void {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }*/
  ngOnInit() {
    document.body.classList.add('bg-img');
    
    
  }
  
  public auth2: any;
  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '819882227452-77acohmnbiau2kiaqlglv1c0v45qbc5s.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      //this.attachSignin(document.getElementById('googleBtn'));
    });
  }

  
  public attachSignin() {
    


    var element = document.getElementById('googleBtn');
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {

        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        this.isSignedIn = true;
        this.user = {
          'EmailId':profile.getEmail(),
          'Token':googleUser.getAuthResponse().id_token
        };
        localStorage.setItem('User',JSON.stringify(this.user));
        //localStorage.setItem('User1',JSON.stringify(userNew2));
        
        //YOUR CODE HERE



        // Checking and using the user servces
        
        
          if(localStorage.getItem('User1')!=null && this.userService.checkUserExsis(JSON.parse(localStorage.getItem('User1')).emailid,googleUser.getAuthResponse().id_token)){
            alert("Login Successfull");
            //this.zone.run(() => { this.router.navigate(['/home']); });
          }
        else{
          this.userService.addUsers(profile.getEmail(),googleUser.getAuthResponse().id_token);
          
        }
        












    ///////////////////////





      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
      //this.stateService.data = {...};
        
  }
  signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      alert('User signed out.');
    });
    this.isSignedIn = false;
  }


}


