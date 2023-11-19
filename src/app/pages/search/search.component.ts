import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input, OnInit, inject, numberAttribute, signal } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { FiltersDialogComponent } from "../../components/filters-dialog/filters-dialog.component";


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

  private dialog = inject(Dialog);
  private route = inject(ActivatedRoute);
  private router: Router = inject(Router);

  ngOnInit(): void {
    this.route.data.subscribe(({items}) => {
      this.searchItems.set(items);
    })
  }

  ngOnChanges(): void {
    // console.log('moo', this.beds);
  }

  // Following functions move to filters components

  changeFilter(prop: string, value: unknown): void { // TODO: type safe?
    if (!value) {
      return;
    }

    if (prop === 'minBeds' || prop === 'maxBeds') {
      value = parseInt(value as string);
    }

    const updatedQueryParams = {
      ...this.route.snapshot.queryParams,
      ...this.route.snapshot.params,
      [prop]: value
    };

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