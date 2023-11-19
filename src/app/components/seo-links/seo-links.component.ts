import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-seo-links',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './seo-links.component.html',
  styleUrls: ['./seo-links.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeoLinksComponent {
  advertType = 'residential';
  purchaseType = 'buy';

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
  ];

  setAdvertAndPurchaseType(advertType: string, purchaseType: string): void {
    this.advertType = advertType;
    this.purchaseType = purchaseType;
  }
}