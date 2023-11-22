import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, filter, map, withLatestFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private http = inject(HttpClient);

  getCounties(): any {

  }

  getTowns(): any {
    return this.http.get('./assets/logainm.json').pipe(withLatestFrom(this.getCountyBoundaries()), map(([log, boundaries]: any) => {
      const towns: any[] = [];
      log.results.forEach((result: any) => {
        const town = result?.cluster?.members?.find((q: any) => q.category.nameEN === 'town');
        if (town) {

          const placename = result?.placenames?.find((pn: any) => pn.language == 'en')?.wording;
          const louthBound =  boundaries.coordinates;
          towns.push({
            placename,
            louthBound
          });
          //towns.push(town);
        }
      });
      //   const yo = moo.results.filter((item: any) => {
      //     const howdy = item?.cluster?.members?.find((q: any) => q.nameEN === 'town');
      //     console.log('howdy', howdy);
      //     if (howdy) {
      //       return true;
      //     } else {
      //       return false;
      //     }
      //   });
      return towns;
    }))
  }

  getCountyLatLong(countyName: string): any {
    // "geography": {
    //   "accurate": true,
    //   "coordinates": [
    //     {
    //       "latitude": 53.714662740776774,
    //       "longitude": -6.346486670852462
    //     }
    //   ]
    // },
    return this.http.get('./assets/app-counties.json').pipe(
      map((res: any) => {
        return res.find((c: any) => c.name === countyName)?.latLong;
      })
    )
  }

  getCountyBoundaries(): any {
    return this.http.get('./assets/louth-coords.json');
  }

  getLouthGeo(): any {
    return this.http.get('./assets/county-boundaries.geojson').pipe(map((geo: any) => {
      const features: any[] = geo.features;
      console.log('features', features)
      const louth: any = features?.find((feature: any) => feature.properties.COUNTY === 'LOUTH');
      return louth.geometry;
    }));
  }

  getCountyGeo(county: string): any {
    console.log('mo', county);
    return this.http.get('./assets/county-boundaries.geojson').pipe((map((geo: any) => {
      const features: any[] = geo.features;
      const countygeo: any = features?.find((feature: any) => feature.properties.COUNTY === county.toUpperCase());
      return countygeo?.geometry ?? [];
    })));
  }

  search(params: any): any {
    let data = this.http.get('./assets/test.json');

    data = this.mockFilters(data, params);
    data = this.mockSort(data, params);
    data = this.mockPage(data, params);
    console.log('eh')

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
  private mockPage(data: Observable<any>, params: any): any {
    if (!params.page || params.page === 1) {
      return data.pipe(map((list) => list.slice(0, 10)));
    }
  }

  // Simulate params from backend
  private mockFilters(data: Observable<any>, params: any): any {
    const yo = data.pipe(map((list) => list.filter((item: any) => {
      let isAllMatch = true;

      Object.keys(params).forEach((k) => {
        let itemValue = item[k]
        let paramValue = params[k];

        if (k === 'sort' || k === 'page') {
          return;
        }

        // TODO START
        // TODO: THIS SHOULD BE DONE IN RESOLVER?
        if (k === 'minBeds' || k === 'maxBeds' || k === 'minPrice' || k === 'maxPrice') {
          paramValue = parseInt(paramValue);
        }
        // TODO END

        if (k === 'county') {
          itemValue = item.address[k].toLowerCase();
        }

        if (k === 'minPrice' || k === 'maxPrice') {
          itemValue = item.price.value;
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