import { Component } from '@angular/core';
import { Layer } from '../layer';
import { LayerService } from '../layer.service';

@Component({
  selector: 'app-route-select-layers',
  templateUrl: './route-select-layers.component.html',
  styleUrls: ['./route-select-layers.component.scss']
})
export class RouteSelectLayersComponent {

  opened: boolean;

  get categories(): string[] {
    return this.layerService.categories;
  }

  set selectedCategory(value: string) {
    this.layerService.setSelectedCategory(value);
  }

  get selectedCategory(): string {
    return this.layerService.selectedCategory;
  }

  set selectedLayer(value: Layer) {
    this.layerService.setSelectedLayer(value);
  }

  get selectedLayer(): Layer {
    return this.layerService.selectedLayer;
  }

  get layers(): Layer[] {
    return this.layerService.layers;
  }

  set selectedUniqueValuesField(value: string) {
    this.layerService.selectedUniqueValuesField = value;
    this.layerService.setUniqueValues(value);
  }

  get selectedUniqueValuesField(): string {
    return this.layerService.selectedUniqueValuesField;
  }

  get uniqueValues() {
    return this.layerService.uniqueValues;
  }

  set selectedUniqueValue(value: string) {
    this.layerService.selectedUniqueValue = value;
  }

  get definitionExpression(): string {
    if (this.layerService.selectedUniqueValuesField && this.layerService.selectedUniqueValue) {
      return `${this.layerService.selectedUniqueValuesField} = '${this.layerService.selectedUniqueValue}'`;
    } else {
      return null;
    }
  }

  get selectedFeatureAttributes(): object {
    return this.layerService.selectedFeatureAttributes;
  }

  constructor(private layerService: LayerService) { }

}
