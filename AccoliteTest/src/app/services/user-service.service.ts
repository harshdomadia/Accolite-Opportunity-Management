import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import { NgZone } from '@angular/core';

export interface Users{
  userid:number;
  emailid:string;
  token:string;
}

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor( private http:HttpClient,public zone: NgZone,private router: Router) { }

    checkUserExsis(email,token): boolean{
      console.log("Email in check"+email);
      let urlDelete = 'http://localhost:9095/api/getUser?emailid='+email;

    
   
    this.http.get<Users>(urlDelete).subscribe(res=>{
      //console.log("User1"+JSON.stringify(res));
      if(res!=null && JSON.parse(localStorage.getItem('User1'))!=null){
        if(res.emailid===JSON.parse(localStorage.getItem('User1')).emailid && res.token === token){
          let user1 = {
            'id':res.userid,
            'EmailId':res.emailid,
            'Token':res.token
          };
          console.log("User1"+user1);
          //localStorage.setItem('User1',JSON.stringify(user1));

          
            return true;
        }
        else if(res.emailid===email && res.token!==token){
          alert("User already logged in, Create New Session to Continue");

          let updatedData = {
            userid:res.userid,
            emailid:email,
            token:res.token,
          };
          console.log(updatedData);
          let urlUpdate = 'http://localhost:9095/api/updateUser';
      
          this.http.put<Users[]>(urlUpdate, updatedData).subscribe(res=>{
            
            localStorage.setItem('User1',JSON.stringify(updatedData));
            this.zone.run(() => { this.router.navigate(['/home']); });
      
          },err =>{
            alert("Could not add data");
          });

          return true;
        }


        
        }},err =>{
          alert(JSON.stringify(err));
    });
    return false;
      
    }

    addUsers(email,token):boolean{
      let userNew = {
        emailid:email,
        token:token
      }
      const headers = new HttpHeaders({ 'Content-Type': 'application/json'});  
      let urlAdd = "http://localhost:9095/api/addUser";
      console.log("Inside New User"+JSON.stringify(userNew));

      this.http.post<Users[]>(urlAdd,userNew).subscribe(res =>{
        let userNew1 = res.pop();
        let userNew2 = {
          userid:userNew1.userid,
          emailid:userNew1.emailid,
          token:userNew1.token
        }
        
        localStorage.setItem('User1',JSON.stringify(userNew2));
        this.zone.run(() => { this.router.navigate(['/home']); });
          return true;
      },err=>{

        alert(JSON.stringify(err));

      });
      return false;
    }

    deleteUser(id){

      let urlDelete = 'http://localhost:9095/api/deleteUser';

      this.http.delete<Users>(`${urlDelete}/${id}`).subscribe(res=>{
        localStorage.removeItem("User1");
          return true;
        },err =>{
              alert(JSON.stringify(err));
        });
        return false;
    
      

    }
 
}
