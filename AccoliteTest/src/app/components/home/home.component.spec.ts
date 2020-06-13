import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MatDialogModule} from '@angular/material/dialog';
import { HomeComponent } from './home.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {DialogBoxComponent} from '../dialog-box/dialog-box.component';
import { By } from '@angular/platform-browser'

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let dialogComponents:DialogBoxComponent;
  let dialogFixtures: ComponentFixture<DialogBoxComponent>; 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent,DialogBoxComponent ],
      imports: [MatDialogModule,HttpClientTestingModule,RouterTestingModule,DialogBoxComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    dialogFixtures = TestBed.createComponent(DialogBoxComponent);
    component = fixture.componentInstance;
    dialogComponents = dialogFixtures.componentInstance;
    fixture.detectChanges();
    dialogFixtures.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('dialog box open', ()=>{
    let btn = fixture.debugElement.query(By.css('#createOpportunity'));
    
});

});
