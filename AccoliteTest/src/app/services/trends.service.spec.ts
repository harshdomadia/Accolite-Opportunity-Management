import { TestBed,getTestBed, async } from '@angular/core/testing';
import {HttpTestingController,HttpClientTestingModule} from '@angular/common/http/testing';

import { TrendsService } from './trends.service';
import { Trends } from '../components/trends/trends.component';
import { request } from 'http';
import { HttpRequest, HttpHeaders } from '@angular/common/http';

describe('TrendsService', () => {
  let service: TrendsService;
  let httpMock:HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(TrendsService);
    httpMock = TestBed.get(HttpTestingController);
  }));

  it('should be created', () => {
    
    expect(service).toBeTruthy();
  });
  afterEach(()=>{
    httpMock.verify();
  });

  it('Should get the Trends forom database', async () => {
    const dummyPost:Trends[] =  [
      {
      "Java":{
        "2015":2
      }
      }];
    service.getTrends().subscribe(res => {
      expect(res.length).toBe(1);
      expect(res).toEqual(dummyPost);
    });
    service.getTrends()
    let urlgetTrends = 'http://localhost:9095/api/getTrends1';
    const req = httpMock.expectOne(urlgetTrends);


    expect(req.request.method).toBe('GET');

    req.flush(dummyPost)
    
    httpMock.expectOne((request: HttpRequest<any>) =>{
      return request.method == 'GET'
      && request.url == urlgetTrends
      && request.headers === service.headersGet
    }).flush(dummyPost);

  })
});
