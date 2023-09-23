import { Component, OnInit, OnDestroy } from '@angular/core';
import { StockService } from '../services/stock.service';
import * as Highcharts from 'highcharts/highstock';
import Chart from 'chart.js';
import { PortfolioService } from '../services/portfolio.service';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.page.html',
  styleUrls: ['./portfolio.page.scss'],
})
export class PortfolioPage  {
  stocks: any[];
  barChart: Chart;
  intervalId: any;
  index = 0;
portfolio: any[];
  currentIndex = 0;
  constructor(private stockService: StockService, private portfolioService: PortfolioService) {}
  ionViewDidEnter() {
    this.stockService.getAllStocks().subscribe((response: any) => {
      this.stocks = response;
      this.initializeBarChart(); // Call the initialization method
      this.updateChart();
      console.log(this.stocks);
      // Start the rotation
      this.startRotation();
    });


    this.portfolioService.getAllPortfolio().subscribe((response: any) => {
      this.portfolio = response;
      this.initializeBarChart(); // Call the initialization method
      this.updateChart();
      console.log(this.portfolio);
      // Start the rotation
      this.startRotation();
    });
  }

  startRotation() {
   setInterval(() => {
     this.currentIndex = (this.currentIndex + 1) % this.stocks.length;
   }, 3000); // Rotate every 5 seconds (adjust as needed)
 }



  onSelectionChange() {
    this.updateChart();
  }

  updateChart() {
    const selectedStocks = this.stocks.filter(stock => stock.selected);
    const chartData = selectedStocks.map(stock => ({
      name: stock.symbol,
      data: stock.stock.map(dataPoint => [
        new Date(dataPoint.Date).getTime(),
        dataPoint.Open,
        dataPoint.High,
        dataPoint.Low,
        dataPoint.Close
      ])
    }));

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

  initializeBarChart() {
    const barCanvas = document.getElementById('barChart') as HTMLCanvasElement;
    const labels = ['AAPL', 'AMZN', 'GOOGL', 'MSFT'];
    const data = this.portfolio.map(folio => folio.total_amount);

    this.barChart = new Chart(barCanvas, {
      type: 'polarArea',
      data: {
        labels,
        datasets: [
          {
            label: 'Sales',
            data,
            backgroundColor: ['#f50a0a', '#f5f50a', '#FFC107', '#11f24d'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }
}
