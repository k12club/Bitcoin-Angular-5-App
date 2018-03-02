import { Component } from '@angular/core';
import { BitcoinPriceService } from './bitcoin-price.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private _bitcoinPrice: BitcoinPriceService) { }

  chart = [];

  ngOnInit() {
    this._bitcoinPrice.lastMounthBitcoinPrice()
      .subscribe(response => {

        let valuesObj = response["bpi"]; // bpi parse object

        let datesList = []; // List for dates
        let pricesList = []; // List for prices

        // Create lists with date
        for (let i in valuesObj) {
          pricesList.push(valuesObj[i]);
          datesList.push(i);
        }

        let lastUpdatedDate = response["time"].updated; // Last updated date



        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: datesList,
            datasets: [{
              backgroundColor: 'rgba(255,235,59,0.4)',
              borderColor: '#FFC107',
              data: pricesList,
              label: 'Bitcoin price',
              fill: true,
              borderWidth: 5,

            }]
          },
          options: Chart.helpers.merge({
            responsive: true,
            title: {
              display: true
            },
           
            spanGaps: false,
            elements: {
              line: {
                tension: 0.0000001
              }
            }
          })
        });


      });
  }
}



