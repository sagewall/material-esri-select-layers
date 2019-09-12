import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-route-select-layers',
  templateUrl: './route-select-layers.component.html',
  styleUrls: ['./route-select-layers.component.scss']
})
export class RouteSelectLayersComponent implements OnInit {

  private layer: string;
  private category: string;
  opened: boolean;
  featureLayerUrl: string;

  set selectedCategory(value: string) {
    this.category = value;
    this.featureLayerUrl = null;
  }

  get selectedCategory(): string {
    return this.category;
  }

  set selectedLayer(value: string) {
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
