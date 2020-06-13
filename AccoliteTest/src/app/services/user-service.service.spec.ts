import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule,HttpTestingController} from '@angular/common/http/testing';

import { UserServiceService } from './user-service.service';
export interface Users{
  userid:number;
  emailid:string;
  token:string;
}

describe('UserServiceService', () => {
  let service: UserServiceService,
  httpTestingController:HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[]

    });
    service = TestBed.inject(UserServiceService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should test get user data',() =>{
    const testPost: Users[] = [
      {userid:1,emailid:'harshdoamadia@accoliteindia.com',token:'auhduasduiagudfa'},
      {userid:2,emailid:'harshdoamadia1@accoliteindia.com',token:'auhduasdxdascuiagudfa'}

    ];
    


  });
});
