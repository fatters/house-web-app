import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from "@angular/core";
import { HttpService } from "../../services/http.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  moo = inject(HttpService);
  yes = signal<any>([]);
  isLoading = signal<boolean>(false);

  route = inject(ActivatedRoute);

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
}