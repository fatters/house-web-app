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

    data = this.mockFilters(data, params);
    data = this.mockPage(data);
    data = this.mockSort(data, params);

    return data;
  }

  // Simulate page sort from backend
  private mockSort(data: Observable<any>, params: any): any {
    if (!params.sort || params.sort === 'newest') {
      return data.pipe(map((list) => list.sort((a: any, b: any) => a.dateCreated < b.dateCreated)));
    }
    
    if (params.sort === 'oldest') {
      return data.pipe(map((list) => list.sort((a: any, b: any) => a.dateCreated > b.dateCreated)));
    }

    if (params.sort === 'priceHigh') {
      return data.pipe(map((list) => list.sort((a: any, b: any) => a.price.value < b.price.value)));
    }

    if (params.sort === 'priceLow') {
      return data.pipe(map((list) => list.sort((a: any, b: any) => a.price.value > b.price.value)));
    }
  }

  // Simulate page from backend
  private mockPage(data: Observable<any>): any {
    return data.pipe(map((list) => list.slice(0, 10)));
  }

  // Simulate params from backend
  private mockFilters(data: Observable<any>, params: any): any {
    const yo = data.pipe(map((list) => list.filter((item: any) => {
      let isAllMatch = true;

      Object.keys(params).forEach((k) => {
        let itemValue = item[k]
        let paramValue = params[k];

        if (k === 'sort') {
          return;
        }

        // TODO START
        // TODO: THIS SHOULD BE DONE IN RESOLVER?
        if (k === 'minBeds' || k === 'maxBeds') {
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