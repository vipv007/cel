import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

interface CurrencyData {
  date: string;
  open: string;
  high: string;
  low: string;
  close: string;
}

@Component({
  selector: 'app-fchart',
  templateUrl: './fchart.component.html',
  styleUrls: ['./fchart.component.css']
})
export class FchartComponent implements OnInit {
  currencyData: CurrencyData[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchCurrencyData();
  }

  fetchCurrencyData() {
    this.http
      .get('https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=USD&apikey=demo')
      .subscribe((response: any) => {
        const seriesData = response['Time Series FX (Daily)'];

        for (const key in seriesData) {
          if (seriesData.hasOwnProperty(key)) {
            const data = seriesData[key];
            this.currencyData.push({
              date: key,
              open: data['1. open'],
              high: data['2. high'],
              low: data['3. low'],
              close: data['4. close']
            });
          }
        }

        this.createChart();
      });
  }

  createChart() {
    Chart.register(...registerables); // Register the necessary scales

    const chartData = {
      labels: this.currencyData.map(data => data.date),
      datasets: [
        {
          label: 'Open',
          data: this.currencyData.map(data => data.open),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: 'High',
          data: this.currencyData.map(data => data.high),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: 'Low',
          data: this.currencyData.map(data => data.low),
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 1
        },
        {
          label: 'Close',
          data: this.currencyData.map(data => data.close),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    };

    const chart = new Chart('currency-chart', {
      type: 'bar',
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
