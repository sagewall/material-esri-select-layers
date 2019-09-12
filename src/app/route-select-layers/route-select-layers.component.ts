import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-route-select-layers',
  templateUrl: './route-select-layers.component.html',
  styleUrls: ['./route-select-layers.component.scss']
})
export class RouteSelectLayersComponent implements OnInit {

  private layer: string;
  opened: boolean;
  featureLayerUrl: string;
  selectedCategory: string;

  set selectedLayer(value) {
    this.layer = value;

    switch (value) {
      case 'stadiums': {
        this.featureLayerUrl = 'https://services1.arcgis.com/kl2GDQGD7Il9fuUc/arcgis/rest/services/MLB_Stadiums/FeatureServer/0';
        break;
      }
      case 'historicPoints': {
        this.featureLayerUrl = 'https://services1.arcgis.com/kl2GDQGD7Il9fuUc/arcgis/rest/services/Historic_Place/FeatureServer/0';
        break;
      }
      case 'historicAreas': {
        this.featureLayerUrl = 'https://services1.arcgis.com/kl2GDQGD7Il9fuUc/arcgis/rest/services/Historic_Area/FeatureServer/0';
        break;
      }
      default: {
        this.featureLayerUrl = null;
        break;
      }
    }
  }

  get selectedLayer(): string {
    return this.layer;
  }

  constructor() { }

  ngOnInit() {
  }

}
