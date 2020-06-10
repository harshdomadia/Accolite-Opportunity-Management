//dialog-box.component.ts
import { Component, Inject, Optional,OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDatepicker,MatDatepickerToggle} from'@angular/material/datepicker'
import { Location } from '@angular/common';

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

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {
  public ownerForm: FormGroup;


  action:string;
  local_data:any;
  isSubmitted:boolean =  false;


  ngOnInit() {
    document.body.classList.remove('bg-img');
    this.ownerForm = new FormGroup({
      opportunitydescription: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      manageremail: new FormControl('', [Validators.required, Validators.maxLength(100),Validators.pattern("[^ @]*@[^ @]*")]),
      location:new FormControl('', [Validators.required, Validators.maxLength(100)]),
      skills:new FormControl('', [Validators.required, Validators.maxLength(100)]),
      openingcount:new FormControl('', [Validators.required, Validators.maxLength(100)]),
      projectduration:new FormControl('', [Validators.required, Validators.maxLength(100)]),
      lastdatetoapply:new FormControl('', [Validators.required, Validators.maxLength(100)]),
      experience:new FormControl('', [Validators.required, Validators.maxLength(100)]),
      managername:new FormControl('', [Validators.required, Validators.maxLength(100)]),
    });
    
    
  }

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData,) {
    console.log(data);
    this.local_data = {...data};
    this.action = this.local_data.action;
  }

  doAction(){
    if (this.ownerForm.valid && (this.action==='Add' || this.action==='Update')) {
      this.isSubmitted = true;
      window.alert("Records Modified");
      console.log("Records Modified");
      this.dialogRef.close({event:this.action,data:this.local_data});
    }
    else if (this.action==='Delete') {
      this.dialogRef.close({event:this.action,data:this.local_data});
    }
    else if(!this.ownerForm.valid)
    {
      alert("Form Data Not Valid");
    }

    //this.dialogRef.close({event:this.action,data:this.local_data});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
  onClear() {
    /*
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.success(':: Submitted successfully');*/
  }

  onSubmit() {
    /*
    if (this.service.form.valid) {
      this.service.insertEmployee(this.service.form.value);
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success(':: Submitted successfully');
    }*/
  }
  public hasError = (controlName: string, errorName: string) =>{
    return this.ownerForm.controls[controlName].hasError(errorName);
  }

}