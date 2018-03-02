import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BitcoinPriceService {

  constructor(private _http: HttpClient) { }

  lastMounthBitcoinPrice() {

    var dates = [];
    var date = new Date();

    for (var i = 0; i < 7; i++) {
      var tempDate = new Date();
      tempDate.setDate(date.getDate() - i);
      var str = tempDate.getFullYear() + "-" + ('0' + (tempDate.getMonth() + 1)).slice(-2) + "-" + ('0' + (tempDate.getMonth() + 1)).slice(-2);
      dates.push(str);
    }

    var strLink = "https://api.coindesk.com/v1/bpi/historical/close.json?start=" + dates[dates.length - 1] + "&end=" + dates[0];

    return this._http.get(strLink)
      .map(result => result)
  }

}