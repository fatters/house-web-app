import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SeoLinksComponent } from "../../components/seo-links/seo-links.component";

declare let L: any;

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, SeoLinksComponent],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit {
  ngOnInit(): void {
    var map = (window as any).L?.map('map').setView([51.505, -0.09], 13);
    (window as any).L?.tileLayer('https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png https://b.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    
//     (window as any).L?.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
//       maxZoom: 18,
//       attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
//           'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//       id: 'mapbox/streets-v11',
//       tileSize: 512,
//       zoomOffset: -1
//   }).addTo(map);

    const areaSelection = new (window as any).leafletAreaSelection.DrawAreaSelection({
      onPolygonReady: () => console.log('mooo')
    });
    console.log(areaSelection);

    areaSelection.onPolygonReady((poly: any) => console.log('moo?', poly))

map.addControl(areaSelection);
  }
}