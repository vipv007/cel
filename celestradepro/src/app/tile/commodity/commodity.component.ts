import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js';
import { CommodityService } from 'src/app/services/commodity.service';

interface CommodityData {
  _id: string;
  Commodity: string;
  Symbol: string;
  Data: {
    Date: string;
    Ask: number;
    Bid: number;
    Change: number;
    Open: number;
    High: number;
    Low: number;
    Close: number;
  }[];
}

@Component({
  selector: 'app-commodity',
  templateUrl: './commodity.component.html',
  styleUrls: ['./commodity.component.scss'],
})
export class CommodityComponent implements OnInit {
  @ViewChild('commodityChart') commodityChart: ElementRef;

  chart: Chart;
  symbols: { name: string; checked: boolean }[] = [
    { name: 'Gold', checked: false },
    { name: 'Silver', checked: false },
    { name: 'Crude Oil', checked: false },
    
  ];

  constructor(private commodityService: CommodityService) {}

  ngOnInit() {
    this.updateChart();
  }

  updateChart() {
    const selectedSymbols = this.symbols.filter((symbol) => symbol.checked);

    this.commodityService.getCommodities().subscribe(
      (data: CommodityData[]) => {
        const symbolToColorMap: { [key: string]: string } = {
          Gold: 'gold',
          Silver: 'silver',
          'Crude Oil': 'blue',
        
        };

        const filteredData = data.filter((commodity) =>
          selectedSymbols.find((symbol) => commodity.Commodity === symbol.name)
        );

        const datasets = filteredData.map((commodity) => {
          const prices = commodity.Data.map((d) => d.Close);
          return {
            label: commodity.Commodity,
            data: prices,
            borderColor: symbolToColorMap[commodity.Commodity],
            fill: false,
          };
        });

        const dates = filteredData.length > 0 ? filteredData[0].Data.map((d) => d.Date) : [];

        if (!this.chart) {
          this.chart = new Chart(this.commodityChart.nativeElement, {
            type: 'line',
            data: {
              labels: dates,
              datasets: datasets,
            },
            options: {
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Commodity Prices in 2022',
                },
              },
              scales: {
                x: {
                  display: true,
                  title: {
                    display: true,
                    text: 'Date',
                  },
                  type: 'time',
                },
                y: {
                  display: true,
                  title: {
                    display: true,
                    text: 'Price ($)',
                  },
                },
              },
            } as ChartOptions,
          });
        } else {
          this.chart.data.labels = dates;
          this.chart.data.datasets = datasets;
          this.chart.update();
        }
      },
      (error) => {
        console.error('Error fetching commodity data:', error);
      }
    );
  }
}