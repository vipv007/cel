/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/consistent-type-assertions */

import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { RatioService } from '../../services/ratio.service';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss'],
})
export class MetricsComponent implements OnInit {

  ratios: any[] = [];
  selectedFields: string[] = [];

  constructor(private ratioService: RatioService) {}

  ngOnInit() {
    this.ratioService.getAllRatios().subscribe((response: any) => {
      this.ratios = response;
      this.updateChart();
    });
  }

  toggleData(field: string) {
    if (this.selectedFields.includes(field)) {
      this.selectedFields = this.selectedFields.filter(f => f !== field);
    } else {
      this.selectedFields.push(field);
    }
    this.updateChart();
  }

  updateChart() {
    const datasets = [];

    this.selectedFields.forEach(field => {
      datasets.push({
        label: field,
        data: this.ratios.map(item => item.metrics[field]),
        backgroundColor: getBackgroundColorForField(field),
      });
    });

    const ctx = <HTMLCanvasElement>document.getElementById('cylinderChart');
    let myChart = new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        labels: this.ratios.map(item => item.symbol),
        datasets,
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    // Destroy the existing chart instance before creating a new one
    if (myChart) {
      myChart.destroy();
    }

    myChart = new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        labels: this.ratios.map(item => item.symbol),
        datasets,
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}

function getBackgroundColorForField(field: string): string {
  switch (field) {
    case 'P/B':
      return '#cc8424';
    case 'P/E':
      return '#2dbdc7';
    case 'Forward P/E':
      return '#ecb59c';
    case 'PEG':
      return '#9c8459';
    case 'Debt/Eq':
      return '#bca471';
    case 'EPS (ttm)':
      return '#d44133';
    case 'Dividend %':
      return '#ecb59c';
    case 'ROE':
      return '#b78167';
    case 'ROI':
      return '#cf9c90';
    case 'EPS Q/Q':
      return 'rgba(153, 102, 255, 0.2)';
    case 'Insider Own':
      return 'rgba(54, 162, 235, 0.2)';
    default:
      return '';
  }
}
