import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StockService } from '../services/stock.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-plots',
  templateUrl: './plots.page.html',
  styleUrls: ['./plots.page.scss'],
})
export class PlotsPage implements OnInit {

  @ViewChild('canvas', { static: true }) canvas: ElementRef;

  chart: any;

  constructor(private stockService: StockService) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.stockService.getAllStocks().subscribe((response: any) => {
      const fxname = 'AMZN';
      const forex = response.find(entry => entry.STK === fxname);
      if (forex) {
        const ohlcData = forex.stock;
        console.log(ohlcData);
        const data = {
          labels: ['Open', 'High', 'Low', 'Close'],
          datasets: [{
            data: [ohlcData.Open, ohlcData.High, ohlcData.Low, ohlcData.Close],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
          }]
        };
        this.chart = new Chart(this.canvas.nativeElement, {
          type: 'pie',
          data,
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        });
      }
    });
  }
}
