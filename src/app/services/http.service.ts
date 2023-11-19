import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private http = inject(HttpClient);

  search(params: any): any {
    let data = this.http.get('./assets/test.json');

    data = this.params(data, params);
    data = this.page(data);

    return data;
  }

  // Simulate page from backend
  private page(data: Observable<any>): any {
    return data.pipe(map((list) => list.slice(0, 10)));
  }

  // Simulate params from backend
  private params(data: Observable<any>, params: any): any {
    const yo = data.pipe(map((list) => list.filter((item: any) => {
      let isAllMatch = true;

      Object.keys(params).forEach((k) => {
        let itemValue = item[k]
        let paramValue = params[k];



        // TODO START
        // TODO: THIS SHOULD BE DONE IN RESOLVER?
        if (k === 'minBeds' || k === 'maxBeds' || k === 'baths' || k === 'sizeMetersSquared') {
          paramValue = parseInt(paramValue);
        }

        // TODO END

        if (k === 'county') {
          itemValue = item.address[k].toLowerCase();
        }

        if (k === 'minBeds' || k === 'maxBeds') {
          itemValue = item['beds'];
        }

        if (k.startsWith('min')) {
          if (itemValue < paramValue) {
            isAllMatch = false;
          }
        } else if (k.startsWith('max')) {
          if (itemValue > paramValue) {
            isAllMatch = false;
          }          
        } else {
          if (itemValue !== paramValue) {
            isAllMatch = false;
          }
        }
      });

      return isAllMatch;
    })));

    return yo;  
  }
}