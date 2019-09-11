import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-route-select-layers',
  templateUrl: './route-select-layers.component.html',
  styleUrls: ['./route-select-layers.component.scss']
})
export class RouteSelectLayersComponent implements OnInit {

  private layer: string;
  private mapLayer: any;

  selectedCategory: string;

  set selectedLayer(value) {
    this.layer = value;

    switch (value) {
      case 'soils': {
        this.mapLayer = 'https://landscape11.arcgis.com/arcgis/rest/services/USA_Soils_Map_Units/mapserver';
        break;
      }
      case 'surfaceGeology': {
        this.mapLayer = 'https://landscape1.arcgis.com/arcgis/rest/services/USA_Geology_Units/MapServer';
        break;
      }
      case 'surfaceWater': {
        this.mapLayer = 'https://landscape2.arcgis.com/arcgis/rest/services/USA_Surface_Water/ImageServer';
        break;
      }
      case 'aquifers': {
        this.mapLayer = 'https://landscape2.arcgis.com/arcgis/rest/services/USA_Surface_Water/ImageServer';
        break;
      }
      default: {
        this.mapLayer = '';
        break;
      }
    }

    this.switchMapLayer(value);
  }

  get selectedLayer(): string {
    return this.layer;
  }

  constructor() { }

  ngOnInit() {
  }

  switchMapLayer(value) {
    console.log(this.mapLayer);
  }

}
