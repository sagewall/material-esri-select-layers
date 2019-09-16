import { Injectable } from '@angular/core';
import { LayerCategory } from './layer-category';
import { Layer } from './layer';
import { loadModules } from 'esri-loader';
import esri = __esri;

const LAYERCATEGORIES: LayerCategory[] = [
  {
    category: 'Baseball',
    layers: [
      {
        name: 'Stadiums',
        url: 'https://services1.arcgis.com/kl2GDQGD7Il9fuUc/arcgis/rest/services/MLB_Stadiums/FeatureServer/0',
        uniqueValueFields: ['LEAGUE', 'DIVISION']
      }
    ]
  },
  {
    category: 'Historic Places',
    layers: [
      {
        name: 'Historic Points',
        url: 'https://services1.arcgis.com/kl2GDQGD7Il9fuUc/arcgis/rest/services/Historic_Place/FeatureServer/0',
        uniqueValueFields: ['Area_Group']
      },
      {
        name: 'Historic Areas',
        url: 'https://services1.arcgis.com/kl2GDQGD7Il9fuUc/arcgis/rest/services/Historic_Area/FeatureServer/0',
        uniqueValueFields: ['Area_Group']
      }
    ]
  }
];

@Injectable({
  providedIn: 'root'
})
export class LayerService {

  esriLoaderOptions: object = {};
  featureLayer: esri.FeatureLayer;
  selectedCategory: string;
  selectedLayer: Layer;
  selectedUniqueValuesField: string;
  selectedUniqueValue: string;
  uniqueValues: string[] = [];
  layers: Layer[];

  get categories(): string[] {
    return LAYERCATEGORIES.map(a => a.category);
  }

  constructor() {
    this.esriLoaderOptions = {
      url: 'https://js.arcgis.com/4.12/'
    };

  }
  setSelectedCategory(value: string) {
    this.selectedCategory = value;
    this.selectedLayer = null;
    this.selectedUniqueValuesField = 'None';
    this.uniqueValues = [];
    this.selectedUniqueValue = null;
    this.setLayers();
  }

  setSelectedLayer(value: Layer) {
    this.selectedLayer = value;
    this.selectedUniqueValuesField = null;
    this.selectedUniqueValue = null;
    this.uniqueValues = [];
  }

  setLayers(): void {
    if (this.selectedCategory === 'None') {
      this.layers = null;
    } else {
      this.layers = LAYERCATEGORIES.find(i => i.category === this.selectedCategory).layers;
    }
  }

  setUniqueValues(field: string) {
    if (field !== 'None') {
      loadModules([
        'esri/renderers/smartMapping/statistics/uniqueValues',
        'esri/layers/FeatureLayer'
      ], this.esriLoaderOptions)
        .then(([
          uniqueValues,
          FeatureLayer
        ]) => {
          this.featureLayer = new FeatureLayer({
            url: this.selectedLayer.url
          });
          uniqueValues({
            layer: this.featureLayer,
            field
          }).then((response) => {
            const infos = response.uniqueValueInfos;
            this.uniqueValues = [];
            infos.forEach((info) => {
              this.uniqueValues.push(info.value);
            });
          });

        });
    } else {
      this.uniqueValues = [];
      this.selectedUniqueValue = null;
    }

  }

}
