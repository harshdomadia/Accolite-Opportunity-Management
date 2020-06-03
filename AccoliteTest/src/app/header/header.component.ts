import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { NgZone } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  users:any;
  constructor(private router: Router, public zone: NgZone) { }

  ngOnInit(): void {
    document.body.classList.remove('bg-img');
  }
  public logout():void{
    localStorage.removeItem("User");
    alert("removed"+localStorage.getItem('User'));
    this.zone.run(() => { this.router.navigate(['/login']); });

  }

}
