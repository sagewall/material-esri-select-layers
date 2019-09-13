import { Component } from '@angular/core';
import { Layer } from '../layer';
import { LayerCategory } from '../layer-category';

@Component({
  selector: 'app-route-select-layers',
  templateUrl: './route-select-layers.component.html',
  styleUrls: ['./route-select-layers.component.scss']
})
export class RouteSelectLayersComponent {

  private category: string;

  layerCategories: LayerCategory[];
  layers: Layer[];
  selectedLayer: Layer;
  opened: boolean;

  set selectedCategory(value: string) {
    this.category = value;
    this.selectedLayer = null;
    if (this.category === 'None') {
      this.layers = null;
    } else {
      this.layers = this.layerCategories.find(i => i.category === value).layers;
    }
  }

  get selectedCategory(): string {
    return this.category;
  }

  constructor() {
    this.layerCategories = [
      {
        category: 'Baseball',
        layers: [
          {
            name: 'Stadiums',
            url: 'https://services1.arcgis.com/kl2GDQGD7Il9fuUc/arcgis/rest/services/MLB_Stadiums/FeatureServer/0'
          }
        ]
      },
      {
        category: 'Historic Places',
        layers: [
          {
            name: 'Historic Points',
            url: 'https://services1.arcgis.com/kl2GDQGD7Il9fuUc/arcgis/rest/services/Historic_Place/FeatureServer/0'
          },
          {
            name: 'Historic Areas',
            url: 'https://services1.arcgis.com/kl2GDQGD7Il9fuUc/arcgis/rest/services/Historic_Area/FeatureServer/0'
          }
        ]
      }
    ];
  }
}
