import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import * as Highcharts from 'highcharts/highstock';


@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss'],
})
export class AnalysisComponent implements OnInit{

  stocks: any;

  constructor(private stockService: StockService) {}

  ngOnInit() {
    this.loadChartData();
  }

  loadChartData() {
    // Retrieve data from MongoDB using a service
    this.stockService.getAllStocks().subscribe((response) => {
      this.stocks = response;
      console.log(this.stocks);
      this.updateChart();
    });
  }

  onSelectionChange() {
    this.updateChart();
  }

  updateChart() {
    const selectedStocks = this.stocks.filter(stock => stock.selected);
    const chartData = selectedStocks.map(stock => ({
      name: stock.STK,
      data: stock.stock.map(dataPoint => [
        new Date(dataPoint.Date).getTime(),
        dataPoint.Open,
        dataPoint.High,
        dataPoint.Low,
        dataPoint.Close
      ])
    }));

    // Create candlestick chart
    Highcharts.stockChart('chart', {
      rangeSelector: {
        selected: 1
      },
      title: {
        text: 'Stock Prices'
      },
      yAxis: {
        title: {
          text: 'Price'
        }
      },
      series: chartData.map(data => ({
        type: 'candlestick',
        name: data.name,
        data: data.data,
        color: 'green',
        upColor: 'red'
      }))
    });
  }
}
