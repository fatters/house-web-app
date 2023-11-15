import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from "@angular/core";
import { HttpService } from "../../services/http.service";

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

  ngOnInit(): void {
    this.moo.search().subscribe((mo: any) => this.yes.set(mo));
  }
}