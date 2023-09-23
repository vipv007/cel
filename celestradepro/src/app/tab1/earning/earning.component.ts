import { Component, OnInit } from '@angular/core';
import { EarningService } from '../../services/earning.service';
import { Chart } from 'chart.js'; // Import Chart.js

@Component({
  selector: 'app-earning',
  templateUrl: './earning.component.html',
  styleUrls: ['./earning.component.scss'],
})
export class EarningComponent implements OnInit {
  titles = [];
  chart: any;

  constructor(private earningService: EarningService) {}

  ngOnInit() {
    this.earningService.getAllEarnings().subscribe((response: any) => {
      this.titles = response;
      console.log(this.titles);
      this.generateChart();
    });
  }

  private generateChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: this.titles.map(title => title.symbol),
        datasets: [
          {
            label: 'Actual',
            data: this.titles.map(title => title.actual),
            backgroundColor: '#E97777',

          },
          {
            label: 'Estimate',
            data: this.titles.map(title => title.estimate),
            backgroundColor: '#975C8D',

          },
          {
            label: 'Surprise',
            data: this.titles.map(title => title.surprise),
            backgroundColor: '#C85C8E',

          },
          {
            label: 'Surprise Percent',
            data: this.titles.map(title => title.surprisePercent),
            backgroundColor: '#FFBABA',

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

