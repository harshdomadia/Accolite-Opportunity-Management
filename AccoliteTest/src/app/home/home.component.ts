import { Component, OnInit,ViewChild,AfterContentChecked } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { MatTable} from '@angular/material/table';
import {DialogBoxComponent} from '../dialog-box/dialog-box.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { Applicant } from '../models/applicant.model';
//import { ApplicantService } from './applicant.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import { NgZone } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator'



//Data that needs to be changed after connecting the module to spring boot

// export interface UsersData {
//   skills:string;
//   qualification: string;
//   age: number;
//   name: string;
//   id: string;

// }

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
  
  }
  




  const ELEMENT_DATA: UsersData[] = [
    {
      opportunityid:1001,
      opportunitydescription:"Java Project",
      location:"Mumbai",
      skills:"Java",
      openingcount:5,
      projectduration:4,
      lastdatetoapply:"10/6/2020",
      experience:3,
      managername:"Sushant",
      manageremail:"sushant@accoliteindia.com",
      //createremail:"sushant@accoliteindia.com"
    }
  
 ];



//

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(public dialog: MatDialog, private http:HttpClient,private router: Router, public zone: NgZone) {
    //console.log(this.router.getCurrentNavigation().extras.state.api);
  }
  listData: MatTableDataSource<any>;
  searchKey : string;
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  applicant: Applicant[];
  dataSource:any;
  users:any;
  users1:any;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  
  
  ngOnInit() {
    document.body.classList.remove('bg-img');
    this.users=localStorage.getItem('User');
    this.users1=localStorage.getItem('User1');
    
    if(this.users == null && this.users1 == null){
      alert("Login Unsuccessfull");
      this.zone.run(() => { this.router.navigate(['/login']); });
      localStorage.removeItem('User');
      localStorage.removeItem('User1');
    }
    alert("Login Successfull");
    
      let url = "http://localhost:9095/api/get";
      const headersGet:HttpHeaders  = new HttpHeaders({

        'emailid':(JSON.parse(localStorage.getItem('User1'))).emailid,
        'token':(JSON.parse(localStorage.getItem('User1'))).token
      });
      this.http.get<UsersData[]>(url,  { headers:headersGet  }  ).subscribe(res => {
        this.listData = new MatTableDataSource(res);
        //setTimeout(() => this.dataSource.sort = this.sort);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        if(this.applicant.length != 0)
        {
        this.dataSource = this.applicant;
        
        }
        else
        this.dataSource = ELEMENT_DATA;
      }, 
      err =>{
        alert("error Occured");
      });
      console.log(this.dataSource);
    
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }


  displayedColumns: string[] = ['opportunityid','opportunitydescription','location','skills','openingcount' ,'projectduration','lastdatetoapply','experience','managername','manageremail','actions'];
  
  

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  

  
  
  openDialog(action,obj) {
    obj.action = action;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = obj;
    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);
    
    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj){
    var d = new Date();
    var ids = row_obj.is;
    console.log("Row"+row_obj);
    let newData = {
     
      //opportunityid:row_obj.opportunityid,
      opportunitydescription:row_obj.opportunitydescription,
      location:row_obj.location,
      skills:row_obj.skills,
      openingcount:row_obj.openingcount,
      projectduration:row_obj.projectduration,
      lastdatetoapply:row_obj.lastdatetoapply,
      experience:row_obj.experience,
      managername:row_obj.managername,
      manageremail:row_obj.manageremail,
      createremail:JSON.parse(localStorage.getItem('User')).EmailId
    };
    console.log(newData);
    //this.listData.data.push(newData);
    
    let urlCreate = 'http://localhost:9095/api/create';
    this.table.renderRows();
    const headersAdd:HttpHeaders  = new HttpHeaders({

      'emailid':(JSON.parse(localStorage.getItem('User1'))).emailid,
      'token':(JSON.parse(localStorage.getItem('User1'))).token
    });
    return this.http.post<UsersData[]>(urlCreate, newData,{headers:headersAdd}).subscribe(res=>{
              //console.log("before"+this.listData.data);
              //console.log(res)
              //this.listData.data = [];
              //this.listData.data.push(res);
              this.listData = new MatTableDataSource(res);
              //console.log(this.listData.data);
              this.listData._updateChangeSubscription();
              this.listData.sort = this.sort;
              this.listData.paginator = this.paginator;
    },err =>{
      alert("Could not add data");
    });
    
    
    
    
  }
  updateRowData(row_obj){
    this.listData.data = this.listData.data.filter((value,key)=>{
      if(value.opportunityid == row_obj.opportunityid){
        //value.opportunityid = row_obj.opportunityid;
      }
      if(value.opportunityid == row_obj.opportunityid){
        value.opportunitydescription = row_obj.opportunitydescription;
      }
      if(value.opportunityid == row_obj.opportunityid){
        value.location = row_obj.location;
      }
      if(value.opportunityid == row_obj.opportunityid){
        value.skills = row_obj.skills;
      }
      if(value.opportunityid == row_obj.opportunityid){
        value.openingcount = row_obj.openingcount;
      }
      if(value.opportunityid == row_obj.opportunityid){
        value.projectdurationn = row_obj.projectduration;
      }
      if(value.opportunityid == row_obj.opportunityid){
        value.lastdatetoapply = row_obj.lastdatetoapply;
      }
      if(value.opportunityid == row_obj.opportunityid){
        value.experience = row_obj.experience;
      }
      if(value.opportunityid == row_obj.opportunityid){
        value.managername = row_obj.managername;
      }
      if(value.opportunityid == row_obj.opportunityid){
        value.manageremail = row_obj.manageremail;
      }
      return true;
    });
    let updatedData = {
     
      opportunityid:row_obj.opportunityid,
      opportunitydescription:row_obj.opportunitydescription,
      location:row_obj.location,
      skills:row_obj.skills,
      openingcount:row_obj.openingcount,
      projectduration:row_obj.projectduration,
      lastdatetoapply:row_obj.lastdatetoapply,
      experience:row_obj.experience,
      managername:row_obj.managername,
      manageremail:row_obj.manageremail,
      createremail:JSON.parse(localStorage.getItem('User')).EmailId
    };
    let urlUpdate = 'http://localhost:9095/api/update';
    const headersUpdate:HttpHeaders  = new HttpHeaders({

      'emailid':(JSON.parse(localStorage.getItem('User1'))).emailid,
      'token':(JSON.parse(localStorage.getItem('User1'))).token
    });

    return this.http.put<Applicant>(urlUpdate, updatedData,{headers:headersUpdate}).subscribe(res=>{

    },err =>{
      alert("Could not add data");
    });
    

  }
  deleteRowData(row_obj){

    let urlDelete = 'http://localhost:9095/api/delete';

    const headersDelete:HttpHeaders  = new HttpHeaders({

      'emailid':(JSON.parse(localStorage.getItem('User1'))).emailid,
      'token':(JSON.parse(localStorage.getItem('User1'))).token
    });

    
   this.http.delete<Applicant>(`${urlDelete}/${row_obj.opportunityid}`,{headers:headersDelete}).subscribe(res=>{

    },err =>{
      alert(JSON.stringify(err));
    });
    
    
    const index = this.listData.data.indexOf(row_obj.opportunityid);
    this.listData.data.splice(index, 1);
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
    this.listData._updateChangeSubscription();
    
    
    

  }

  

  
  onSearchClear(){
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter(){
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(DialogBoxComponent,dialogConfig);

  }
  

}
