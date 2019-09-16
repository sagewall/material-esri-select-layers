import { Injectable } from '@angular/core';
import { LayerCategory } from './layer-category';
import { Layer } from './layer';


const LAYERCATEGORIES: LayerCategory[] = [
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

@Injectable({
  providedIn: 'root'
})
export class LayerService {

  selectedCategory: string;
  selectedLayer: Layer;
  layers: Layer[];

  get categories(): string[] {
    return LAYERCATEGORIES.map(a => a.category);
  }

  setSelectedCategory(value: string) {
    this.selectedCategory = value;
    this.selectedLayer = null;
    this.setLayers();
  }

  setLayers(): void {
    if (this.selectedCategory === 'None') {
      this.layers = null;
    } else {
      this.layers = LAYERCATEGORIES.find(i => i.category === this.selectedCategory).layers;
    }
  }

}
