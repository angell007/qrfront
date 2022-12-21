import { Component, OnInit } from '@angular/core';
import { SupportChartData1 } from './chart/support-chart-data-1';
import { SupportChartData2 } from './chart/support-chart-data-2';
import { SeoChart1 } from './chart/seo-chart-1';
import { SeoChart2 } from './chart/seo-chart-2';
import { SeoChart3 } from './chart/seo-chart-3';
import { PowerCardChart1 } from './chart/power-card-chart-1';
import { PowerCardChart2 } from './chart/power-card-chart-2';
import { statictsService } from 'src/app/services/staticts.service';

@Component({
  selector: 'app-dash-default',
  templateUrl: './dash-default.component.html',
  styleUrls: ['./dash-default.component.scss']
})
export class DashDefaultComponent implements OnInit {
  public supportChartData1: any;
  public supportChartData2: any;
  public seoChartData1: any;
  public seoChartData2: any;
  public seoChartData3: any;
  public powerCardChartData1: any;
  public powerCardChartData2: any;

  public alerts: Number;
  public missings: Number;
  public storesWithAlerts: Number;
  public storesWithMissings: Number;
  inventories: any;
  stores: any;
  show: boolean = false;

  constructor(private _staticts: statictsService,) {
    this.supportChartData1 = SupportChartData1.supportChartData;
    this.supportChartData2 = SupportChartData2.supportChartData;
    this.seoChartData1 = SeoChart1.seoChartData;
    this.seoChartData2 = SeoChart2.seoChartData;
    this.seoChartData3 = SeoChart3.seoChartData;
    this.powerCardChartData1 = PowerCardChart1.powerCardChartData;
    this.powerCardChartData2 = PowerCardChart2.powerCardChartData;
  }

  ngOnInit() {
    this.getStaticts();
  }


  getStaticts() {
    this._staticts.getStatics().subscribe((r: any) => {

      this.alerts = r.data.alerts
      this.inventories = r.data.inventories
      this.stores = r.data.stores
      this.missings = r.data.missings
      this.storesWithAlerts = r.data.storesWithAlerts
      this.storesWithMissings = r.data.storesWithMissings

      this.show = true

      console.log(r);
    })
  }

}
