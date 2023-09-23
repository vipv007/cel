import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommodityService } from '../services/commodity.service';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.page.html',
  styleUrls: ['./tile.page.scss'],
})
export class TilePage implements OnInit, OnDestroy {
  filterTerm: any;
  commoditys: any;
  selectTabs = 'recent';
  index = 0;
  private intervalId: any;

  constructor(private commodityService: CommodityService, private http: HttpClient) {}

  ngOnInit() {
    this.loadCommodities(); // Load commodities initially
    this.startAutoReload(); // Start auto reload
  }

  ngOnDestroy() {
    this.stopAutoReload(); // Clear auto reload when the component is destroyed
  }

  loadCommodities() {
    this.commodityService.getCommodities().subscribe((response: any) => {
      this.commoditys = response;
      console.log(this.commoditys);
      this.updateData(); // Update data immediately after receiving the response
      this.resetIndex(); // Reset index when new commodities are loaded
    });
  }

  startAutoReload() {
    this.intervalId = setInterval(() => {
      this.loadCommodities(); // Reload commodities data
    }, 1000); // Reload commodities every 3 seconds (adjust as needed)
  }

  stopAutoReload() {
    clearInterval(this.intervalId);
  }

  resetIndex() {
    this.index = 0;
  }

  updateData() {
    this.index = this.commoditys[0].Data.length - 1; // Update index to point to the last data
  }

  getAskColor(commodity: any): string {
    const askValue = commodity.Data[this.index].Open;
    const bidValue = commodity.Data[this.index].Close;

    if (askValue > bidValue) {
      return '#00FF00'; // Ask value is higher, green color
    } else if (askValue < bidValue) {
      return '#FF0000'; // Bid value is higher, red color
    } else {
      return ''; // No specific color
    }
  }

  getBidColor(commodity: any): string {
    const askValue = commodity.Data[this.index].Open;
    const bidValue = commodity.Data[this.index].Close;

    if (bidValue > askValue) {
      return '#00FF00'; // Bid value is higher, green color
    } else if (bidValue < askValue) {
      return '#FF0000'; // Ask value is higher, red color
    } else {
      return ''; // No specific color
    }
  }
}