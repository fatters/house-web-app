import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
    standalone: true,
    imports: [CommonModule, RouterModule],
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

    setActive(toset: string): void {
        this.active = toset; 
    }
}