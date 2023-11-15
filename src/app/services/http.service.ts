import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { SearchMock } from "../data/search.mock";
import { Observable, filter, flatMap, map, mergeMap, of } from "rxjs";

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

    return of(SearchMock);
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
        if (k === 'beds' || k === 'baths' || k === 'sizeMetersSquared') {
          paramValue = parseInt(paramValue);
        }

        // TODO END

        if (k === 'county') {
          itemValue = item.address[k].toLowerCase();
        }

        if (itemValue !== paramValue) {
          isAllMatch = false;
        }
      });

      return isAllMatch;
    })));

    return yo;  
  }
}