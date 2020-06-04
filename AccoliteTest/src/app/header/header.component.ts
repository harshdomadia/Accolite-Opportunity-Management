import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { NgZone } from '@angular/core';
import {UserServiceService} from '../user-service.service'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  users:any;
  constructor(private router: Router, public zone: NgZone,private userService:UserServiceService) { }

  ngOnInit(): void {
    document.body.classList.remove('bg-img');
  }
  public logout():void{
    localStorage.removeItem("User");
    //localStorage.removeItem("User1");
    this.userService.deleteUser(JSON.parse(localStorage.getItem('User1')).userid);
    
    alert("removed"+localStorage.getItem('User')+localStorage.getItem('User1'));
    this.zone.run(() => { this.router.navigate(['/login']); });

  }

}
