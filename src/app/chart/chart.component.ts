import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActiveCryptoService } from '../active-crypto.service';
import { Subscription } from 'rxjs';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  currentCrypto: string = '';
  currentCryptoTimeline: string = '1y';
  subscription!: Subscription;
  cryptoTimelines: string[] = ['24h', '1w', '1m', '3m', '6m', '1y', 'all'];
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
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100,
      },
      {
        start: 0,
        end: 50,
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

  constructor(private data: DataService, private crypto: ActiveCryptoService) {}

  ngOnInit(): void {
    this.subscription = this.crypto.currentCrypto.subscribe((crypto) => {
      this.currentCrypto = crypto;
      this.getCryptoChart(this.currentCryptoTimeline);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private getCryptoChart(timeline: string) {
    this.data.getCryptoCharts(timeline, this.currentCrypto).subscribe((data) => {
      this.cryptoChart = data;
      let cryptoChartArr = [this.cryptoChart.chart];
      let cryptoPrices: number[] = []
        .concat(...cryptoChartArr)
        .map((arr) => arr[1]);
      const maxPrice: number = Math.max(...cryptoPrices);
      const minPrice: number = Math.min(...cryptoPrices);

      this.dateList = this.cryptoChart.chart.map(function (item: any) {
        return new Date(item[0] * 1000).toISOString().slice(0, 10);
      });
      this.valueList = this.cryptoChart.chart.map(function (item: any) {
        return item[1].toFixed(2);
      });
      this.mergeOptions = {
        visualMap: [
          {
            min: minPrice,
            max: maxPrice,
          },
        ],
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

  public updateTimeline(timeline: string) {
    if (this.currentCryptoTimeline !== timeline) {
      this.currentCryptoTimeline = timeline;
      this.getCryptoChart(this.currentCryptoTimeline);
    }
  }
}
