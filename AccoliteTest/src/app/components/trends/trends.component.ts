import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions,ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import {Router} from '@angular/router';
import { NgZone } from '@angular/core';
import {TrendsService} from '../../services/trends.service';
import { isNgTemplate } from '@angular/compiler';
import { HttpClient, HttpHeaders } from '@angular/common/http';


export interface Trends{
  [key:string]:any;
}


interface Charts {
  value: string;
  viewValue: string;
}

interface Language {
  value: any[];
  viewValue: string;
}

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.scss']
})


export class TrendsComponent implements OnInit {
  selected1:any = '';
  selected2:any;
  selectedSkillWise:any;
  

  constructor(private router: Router, public zone: NgZone, private http:HttpClient,private trendsService:TrendsService) { 
    
    this.trendsService.getTrends().subscribe(res => {

      //let responseToBeUsed = [];
      //let countToBeUsed = [];
      
      for(var type in res){
        //let trendsToBeUsed:Trends ={};
        //trendsToBeUsed.key = type;
        this.chartLabelsSkillWise.push(type.toString());

        //trendsToBeUsed.value = res[type];
        //responseToBeUsed.push(trendsToBeUsed);

        let temp = res[type];
        let count = 0;
        for(var temp1 in temp){
          count+= temp[temp1];
        }
        //countToBeUsed.push(count);
        this.skillWiseData.push(count);
      }

      console.log(res);
      console.log(this.chartLabelsSkillWise);
      //console.log(countToBeUsed);
    });
   
    
  }

   ngOnInit(): void {
    
  }
  charts: Charts[] = [
    {value: 'line', viewValue: 'Line Chart'},
    {value: 'bar', viewValue: 'Bar Chart'}
  ];
  language: Language[] = [
    {value: [2,2,3,3,4], viewValue: 'Java'},
    {value: [8,6,8,5,10], viewValue: 'Python'},
    {value: [10,10,12,9,13], viewValue: 'Angular'}
  ];

  

  public chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
          min: 2015,
          max: 2019,
        }
      }]
    }
  };
  
  changeChart(value){
    this.chartType = value;
  }
  changeLanguage(value){
    this.chartData = [
      { data: value ,label: 'No of Projects Per Year' }
    ];
  }

  changeChartSkills(value){
    this.chartTypeSkill = value;
  }

  //public chartType: ChartType = ;
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  chartLabels: Label[] = ['2015', '2016', '2017', '2018', '2019'];
  chartType: ChartType="bar";
  chartLegend = true;
  chartPlugins = [];

  chartData: ChartDataSets[]=[
    { data:[10,14,15,15,17] ,label: 'No of Projects Per Year' }
  ];





  chartsSkillWise: Charts[] = [
    {value: 'pie', viewValue: 'Pie Chart'},
    {value: 'radar', viewValue: 'Radar Chart'},
    {value: 'doughnut', viewValue: 'Doughnut Chart'}
    
  ];

  chartTypeSkill: ChartType;

  public chartLabelsSkillWise: Label[] = [] ;
  public skillWiseData:number[] = [];

  public chartDataSkillWise: ChartDataSets[] = [
    { data: this.skillWiseData, label: 'No of Projects Per Skills' }
  ];

  public chartOptionsSkillWise: ChartOptions = {
    responsive: true,
  };








}
