import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions,ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import {Router} from '@angular/router';
import { NgZone } from '@angular/core';

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

  constructor(private router: Router, public zone: NgZone) { }

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
  ];;


}
