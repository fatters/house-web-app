import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from "@angular/common";
import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit, inject, numberAttribute, signal } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { FiltersDialogComponent } from "../../components/filters-dialog/filters-dialog.component";
import { HttpService } from '../../services/http.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, DialogModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit, AfterViewInit {
  @Input({ transform: numberAttribute }) minBeds = 0;
  @Input({ transform: numberAttribute }) maxBeds = 0;
  @Input({ transform: numberAttribute }) minPrice = 0;
  @Input({ transform: numberAttribute }) maxPrice = 0;
  @Input() propertyType = '';
  @Input() county = '';
  @Input() town = '';
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
      //setTimeout(() => this.searchItems.set(items), 5000);
      this.searchItems.set(items);
    });

    const updatedQueryParams = {
      ...this.route.snapshot.queryParams,
      ...this.route.snapshot.params
    };

    this.allActiveFilters = updatedQueryParams
  }

  ngAfterViewInit(): void {
    this.handleMap();
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

  // TODO: Own Component, Proper ng intergration -- LOTS
  private handleMap(): void {
    // zoom level 10 pips
    // zoom level 13/14 show price detail

    // county but no town
    let geo$: Observable<any> | undefined;

    if (this.town) {
      geo$ = this.http.getTownGeo(this.town);
    } else if (this.county) {
      geo$ = this.http.getCountyGeo(this.county);
    } 

    if (geo$) {
      geo$.subscribe((geo: any) => {
        var lMap = (window as any).L?.map('map');
  
        (window as any).L?.tileLayer('https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png https://b.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
          minZoom: 9,
          maxZoom: 16,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(lMap);
  
        // SELECTION
        // const areaSelection = new (window as any).leafletAreaSelection.DrawAreaSelection({
        //   onPolygonReady: () => console.log('mooo')
        // });
        // console.log(areaSelection);
  
        // areaSelection.onPolygonReady((poly: any) => console.log('moo?', poly))
        // lMap.addControl(areaSelection);
  
        var gj = (window as any).L.geoJSON(geo, { color: '#3d405b' });
        gj.addTo(lMap);
        lMap.fitBounds(gj.getBounds());
  
        // TODO: only do this when we guarantee we have repsonse
        this.searchItems().forEach((proper: any) => {
          if (proper.latLong) {
            (window as any).L.circle(proper.latLong, {
              color: 'blue',
              fillColor: 'blue',
              fillOpacity: 1,
              radius: 300
            }).addTo(lMap);
          }
        })
      });  
    } else {
      console.log('show county selection')
    }
  
  }
}