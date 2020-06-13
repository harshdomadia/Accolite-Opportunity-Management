import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule,FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { DialogBoxComponent } from './dialog-box.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  FormGroup, Validators } from '@angular/forms';

export interface UsersData {
  
   
    opportunityid:number; 
    opportunitydescription:string;
    location:string;
    skills:string;
    openingcount:number ;
    projectduration:number
    lastdatetoapply:string;
    experience:number;
    managername:string;
    manageremail:string;
    //createremail:string;
    }
  


describe('DialogBoxComponent Add', () => {
  let component: DialogBoxComponent;
  let fixture: ComponentFixture<DialogBoxComponent>;

    ////// Trying & testing

    const dialogMock = {
        close: () => { }
    };
    
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ DialogBoxComponent ],
        imports: [ FormsModule, ReactiveFormsModule,FormsModule,BrowserAnimationsModule, HttpClientModule, RouterTestingModule, MatSnackBarModule, MatDialogModule],
        providers: [
          { provide: MatDialogRef, useValue: dialogMock },
          { provide: MAT_DIALOG_DATA, useValue: [] } ]
      })
        .compileComponents();
    }));






    





  
 
    
  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     imports: [ReactiveFormsModule,FormsModule,BrowserAnimationsModule, HttpClientModule, RouterTestingModule, MatSnackBarModule, MatDialogModule],
  //     declarations: [ DialogBoxComponent ],
  //     providers: [{
  //       // I was expecting this will pass the desired value
  //       provide: MAT_DIALOG_DATA,
  //       useValue: {
  //           action:"Add",
            
  //       }
  //     }]
  //   })
  //   .compileComponents();
  // }));
  
  
  beforeEach(() => {
    //component.action = "Add";
    fixture = TestBed.createComponent(DialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    //oppoService = TestBed.get(OppoService);
  });
  
  /*it('dialog box open', ()=>{
      let btn = fixture.debugElement.query(By.css('#CreateOpportunity'));
      
  });*/
  

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  
  it('is form valid when empty', ()=>{
      expect(component.ownerForm.valid).toBeFalsy();
  }); 

  it('is form valid when filled', ()=>{




    let opportunitydescription = component.ownerForm.controls['opportunitydescription'];
    let manageremail = component.ownerForm.controls['manageremail'];
    let location = component.ownerForm.controls['location'];
    let skills = component.ownerForm.controls['skills'];
    let openingcount = component.ownerForm.controls['openingcount'];
    let projectduration = component.ownerForm.controls['projectduration'];
    let lastdatetoapply = component.ownerForm.controls['lastdatetoapply'];
    let experience = component.ownerForm.controls['experience'];
    let managername = component.ownerForm.controls['managername'];
    
    opportunitydescription.setValue("Scala Project");
    location.setValue("Pune");
    lastdatetoapply.setValue("2020-07-29");
    skills.setValue("Scala");
    openingcount.setValue(0);
    experience.setValue(1);
    manageremail.setValue("vinay@accoliteindia.com");
    projectduration.setValue(4);
    managername.setValue("vinay");



    expect(component.ownerForm.valid).toBeTruthy();
});

it('is form error msg defined', ()=>{


  
  let opportunitydescription = component.ownerForm.controls['opportunitydescription'];
    let manageremail = component.ownerForm.controls['manageremail'];
    let location = component.ownerForm.controls['location'];
    let skills = component.ownerForm.controls['skills'];
    let openingcount = component.ownerForm.controls['openingcount'];
    let projectduration = component.ownerForm.controls['projectduration'];
    let lastdatetoapply = component.ownerForm.controls['lastdatetoapply'];
    let experience = component.ownerForm.controls['experience'];
    let managername = component.ownerForm.controls['managername'];
    



  expect(component.ownerForm.valid).toBeFalsy();
  expect(opportunitydescription.errors['required']).toBeDefined();
  expect(location.errors['required']).toBeDefined();
  expect(lastdatetoapply.errors['required']).toBeDefined();
  expect(skills.errors['required']).toBeDefined();
  expect(openingcount.errors['required']).toBeDefined();
  expect(manageremail.errors['required']).toBeDefined();
  expect(projectduration.errors['required']).toBeDefined();
  expect(managername.errors['required']).toBeDefined();
  expect(experience.errors['required']).toBeDefined();


});

it('Pressing the Add Button',() => {


    let opportunitydescription = component.ownerForm.controls['opportunitydescription'];
    let manageremail = component.ownerForm.controls['manageremail'];
    let location = component.ownerForm.controls['location'];
    let skills = component.ownerForm.controls['skills'];
    let openingcount = component.ownerForm.controls['openingcount'];
    let projectduration = component.ownerForm.controls['projectduration'];
    let lastdatetoapply = component.ownerForm.controls['lastdatetoapply'];
    let experience = component.ownerForm.controls['experience'];
    let managername = component.ownerForm.controls['managername'];
    
    opportunitydescription.setValue("Scala Project");
    location.setValue("Pune");
    lastdatetoapply.setValue("2020-07-29");
    skills.setValue("Scala");
    openingcount.setValue(0);
    experience.setValue(1);
    manageremail.setValue("vinay@accoliteindia.com");
    projectduration.setValue(4);
    managername.setValue("vinay");

    spyOn(component, 'doAction');
    spyOn(window, 'alert');

    //let button = fixture.debugElement.nativeElement.querySelector('button');
    //button.click();
    component.action = "Add";
    component.doAction();
    //component.isSubmitted = true;
    console.log(component.isSubmitted);
    
    
    expect(component.isSubmitted).toBeTrue();
    

});

it('Pressing the Update Button',() => {

    component.isSubmitted = false;
    let opportunitydescription = component.ownerForm.controls['opportunitydescription'];
    let manageremail = component.ownerForm.controls['manageremail'];
    let location = component.ownerForm.controls['location'];
    let skills = component.ownerForm.controls['skills'];
    let openingcount = component.ownerForm.controls['openingcount'];
    let projectduration = component.ownerForm.controls['projectduration'];
    let lastdatetoapply = component.ownerForm.controls['lastdatetoapply'];
    let experience = component.ownerForm.controls['experience'];
    let managername = component.ownerForm.controls['managername'];
    
    opportunitydescription.setValue("Java Project");
    location.setValue("Pune");
    lastdatetoapply.setValue("2020-07-29");
    skills.setValue("Java");
    openingcount.setValue(0);
    experience.setValue(1);
    manageremail.setValue("vinay@accoliteindia.com");
    projectduration.setValue(4);
    managername.setValue("vinay");

    spyOn(component, 'doAction');
    spyOn(window, 'alert');

    //let button = fixture.debugElement.nativeElement.querySelector('button');
    //button.click();
    component.action = "Update";
    component.doAction();
    //component.isSubmitted = true;
    console.log(component.isSubmitted);
    
    
    expect(component.isSubmitted).toBeTrue();
    

});



  


});