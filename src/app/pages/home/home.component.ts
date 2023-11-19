import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { SeoLinksComponent } from "../../components/seo-links/seo-links.component";

@Component({
    standalone: true,
    imports: [CommonModule, RouterModule, SeoLinksComponent],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
    active = 'buy';
    counties = [
      'Antrim',
      'Armagh',
      'Carlow',
      'Cavan',
      'Clare',
      'Cork',
      'Derry',
      'Donegal',
      'Down',
      'Dublin',
      'Fermanagh',
      'Galway',
      'Kerry',
      'Kildare',
      'Kilkenny',
      'Laois',
      'Leitrim',
      'Limerick',
      'Longford',
      'Louth',
      'Mayo',
      'Meath',
      'Monaghan',
      'Offaly',
      'Roscommon',
      'Sligo',
      'Tipperary',
      'Tyrone',
      'Waterford',
      'Westmeath',
      'Wexford',
      'Wicklow'
    ]

    private router = inject(Router);

    setActive(toset: string): void {
        this.active = toset; 
    }

    search(): void {
      this.router.navigate(['/search'], {
        queryParams: { purchaseType: this.active }
      });
    }
}