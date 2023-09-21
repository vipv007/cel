import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js'
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  onValueChange(value: Date): void {
    console.log(`Current value: ${value}`);
  }

  onPanelChange(change: { date: Date; mode: string }): void {
    console.log(`Current value: ${change.date}`);
    console.log(`Current mode: ${change.mode}`);
  }

  constructor() { }

  ngOnInit(): void {
    this.renderChart();
  }

  renderChart() {
    const myChart = new Chart("barchart", {
      type: 'bar',
    
      data: {
        labels: ['2022', '2021', '2020', '2019',],
        datasets: [{
          label: 'Total SMS',
          data: [1200, 1850, 520, 1485,],
          borderWidth: 1,
          backgroundColor: '#0af2c8' // Green color with 50% opacity
        }]
      },
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

