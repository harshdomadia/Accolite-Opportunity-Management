import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


export interface Trends{
  [key:string]:any;
}


@Injectable({
  providedIn: 'root'
})

export class TrendsService {

  public headersGet:HttpHeaders  = new HttpHeaders({

    'emailid':'',
    'token':''
  });
  

  constructor(private http:HttpClient) { 

    
    
  }

  

   getTrends(){
    let urlgetTrends = 'http://localhost:9095/api/getTrends1';

    let emailid = "";
    let token = "";
  
    try{
  
       emailid =  ((JSON.parse(localStorage.getItem('User1'))).emailid);
       token =  ((JSON.parse(localStorage.getItem('User1'))).token);
    }
    catch(e){
      emailid = "";
      token = "";
    }
      this.headersGet = new HttpHeaders({
  
        'emailid':emailid,
        'token':token
      });
    
    return this.http.get<Trends[]>(urlgetTrends,  { headers:this.headersGet  });


  }


}
