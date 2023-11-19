import { CommonModule, Location } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input, OnInit, inject, numberAttribute, signal } from "@angular/core";
import { HttpService } from "../../services/http.service";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './advert.component.html',
  styleUrls: ['./advert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdvertComponent {
  location = inject(Location);

  back(): void {
    this.location.back();
  }
}