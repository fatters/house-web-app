import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from "@angular/core";
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
  moo = inject(HttpService);
  yes = signal<any>([]);
  isLoading = signal<boolean>(false);

  route = inject(ActivatedRoute);
  router: Router = inject(Router);

  ngOnInit(): void {
    this.route.data.subscribe(({items}) => {
      this.yes.set(items);
    })
    // this.moo.search().subscribe((mo: any) => {
    //   this.isLoading.set(true);
    //   this.yes.set(mo)
    //   this.isLoading.set(false);
    // });
  }

  changeBeds(event: any): void { // TODO: type safe?
    const value = event?.target?.value;

    if (!value) {
      return;
    }

    const beds = parseInt(value);

    const updatedQueryParams = {
      ...this.route.snapshot.queryParams,
      ...this.route.snapshot.params,
      beds
    }

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
}