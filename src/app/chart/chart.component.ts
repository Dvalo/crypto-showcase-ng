import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  cryptoChart: any = [];
  dateList: string[] = [];
  valueList: string[] = [];
  mergeOptions: EChartsOption = {};
  chartOption: EChartsOption = {
    visualMap: [
      {
        show: false,
        type: 'continuous',
        seriesIndex: 0,
        min: 40000,
        max: 60000,
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 10,
      },
      {
        start: 0,
        end: 10,
      },
    ],
    xAxis: [
      {
        data: this.dateList,
      },
    ],
    yAxis: [{}],
    series: [
      {
        type: 'line',
        data: this.valueList,
        showSymbol: false,
      },
    ],
  };

  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.data.getCryptoCharts().subscribe((data) => {
      this.cryptoChart = data;
      this.dateList = this.cryptoChart.chart.map(function (item: any) {
        return new Date(item[0] * 1000).toISOString().slice(0, 10);
      });
      this.valueList = this.cryptoChart.chart.map(function (item: any) {
        return item[1].toFixed(2);
      });
      this.mergeOptions = {
        xAxis: [
          {
            data: this.dateList,
          },
        ],
        series: [
          {
            data: this.valueList,
          },
        ],
      };
    });
  }
}
