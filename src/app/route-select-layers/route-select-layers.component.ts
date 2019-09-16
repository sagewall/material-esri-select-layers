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
    this.layerService.selectedLayer = value;
  }

  get selectedLayer(): Layer {
    return this.layerService.selectedLayer;
  }

  get layers(): Layer[] {
    return this.layerService.layers;
  }

  constructor(private layerService: LayerService) { }

}
