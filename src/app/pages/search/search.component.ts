import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input, OnInit, inject, numberAttribute, signal } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { FiltersDialogComponent } from "../../components/filters-dialog/filters-dialog.component";
import { HttpService } from '../../services/http.service';
import { map } from 'rxjs';


@Component({
  standalone: true,
  imports: [CommonModule, DialogModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  @Input({ transform: numberAttribute }) minBeds = 0;
  @Input({ transform: numberAttribute }) maxBeds = 0;
  @Input({ transform: numberAttribute }) minPrice = 0;
  @Input({ transform: numberAttribute }) maxPrice = 0;
  @Input() propertyType = '';
  @Input() county = '';
  @Input() sort = '';

  searchItems = signal<any>([]);
  isLoading = signal<boolean>(false);
  allActiveFilters: any = [];

  private dialog = inject(Dialog);
  private route = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private http: HttpService = inject(HttpService);

  ngOnInit(): void {
    this.route.data.subscribe(({ items }) => {
      console.log('set search items');
      this.searchItems.set(items)
    });

    const updatedQueryParams = {
      ...this.route.snapshot.queryParams,
      ...this.route.snapshot.params
    };

    this.allActiveFilters = updatedQueryParams


  }

  ngAfterViewInit(): void {

    this.http.getTowns().subscribe((towns: any) => console.log('TOWNS', towns));

    const louthCoords = [53.9282, -6.40929];

    this.http.getCountyLatLong(this.county).subscribe((latLong: any) => {
      console.log('LATTY', latLong)
      var lMap = (window as any).L?.map('map').setView([latLong.latitude, latLong.longitude], 10);
      (window as any).L?.tileLayer('https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png https://b.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        minZoom: 8,
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(lMap);


      const areaSelection = new (window as any).leafletAreaSelection.DrawAreaSelection({
        onPolygonReady: () => console.log('mooo')
      });
      console.log(areaSelection);

      areaSelection.onPolygonReady((poly: any) => console.log('moo?', poly))

      // this.http.getCountyBoundaries().subscribe((shape: any) => {
      //   // (window as any).L?.Draw.Polygon(lMap).addVertex(shape)
      //   console.log('SHAPE', shape.coordinates);
      //   var polygon = (window as any).L.polygon(shape.coordinates, {color: 'red'});
      //   polygon.addTo(lMap);
      // });

      this.http.getCountyGeo(this.county).subscribe((geo: any) => {
        var gj = (window as any).L.geoJSON(geo, {color: '#3d405b'});
        gj.addTo(lMap);
      })

      const propertiesOnmap = this.searchItems(); //.map((thing: any) => thing.latLong)

      console.log('MAP ZOOM', lMap.zoom)

      propertiesOnmap.forEach((proper: any) => {
        if (proper.latLong) {
          (window as any).L.circle(proper.latLong, {
            color: 'blue',
            fillColor: 'blue',
            fillOpacity: 1,
            radius: 300
          }).addTo(lMap);
        }

      })

      console.log('time to draw pins', );


      lMap.addControl(areaSelection);
    })
    // zoom level 10 pips
    // zoom level 13/14 show price detail

    // THIS MAY NEED TO GO INTO AFTERVIEWINIT





    //     (window as any).L?.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    //       maxZoom: 18,
    //       attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
    //           'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    //       id: 'mapbox/streets-v11',
    //       tileSize: 512,
    //       zoomOffset: -1
    //   }).addTo(map);

  }

  ngOnChanges(): void {
    // console.log('moo', this.beds);
  }

  // Following functions move to filters components

  changeFilter(prop: string, value: unknown): void { // TODO: type safe?
    if (!value) {
      return;
    }

    if (prop === 'minBeds' || prop === 'maxBeds' || prop === 'minPrice' || prop === 'maxPrice') {
      value = parseInt(value as string);
    }

    const updatedQueryParams = {
      ...this.route.snapshot.queryParams,
      ...this.route.snapshot.params,
      [prop]: value
    };

    this.allActiveFilters = updatedQueryParams;

    const currentUrl = this.router.url.split('?')[0];

    let navigateTo: string[] = [];
    if (currentUrl !== '/search') {
      navigateTo = ['/search'];
    }

    this.router.navigate(navigateTo, {
      relativeTo: this.route,
      queryParams: updatedQueryParams,
      queryParamsHandling: 'merge'
    });
  }

  openAllFilters(): void {
    console.log('test')
    this.dialog.open(FiltersDialogComponent);
  }
}