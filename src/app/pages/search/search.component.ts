import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input, OnInit, inject, numberAttribute, signal } from "@angular/core";
import { HttpService } from "../../services/http.service";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";


@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
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

  searchItems = signal<any>([]);
  isLoading = signal<boolean>(false);

  // private dialog = inject(Dialog); TODO instal cdk
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
    console.log('open all');
    // this.dialog.open(CdkDialogDataExampleDialog, {
    //   minWidth: '300px',
    //   data: {
    //     animal: 'panda',
    //   },
    // });
  }
}