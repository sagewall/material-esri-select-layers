import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { loadModules } from 'esri-loader';
import { LayerService } from '../layer.service';
import esri = __esri;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {

  esriLoaderOptions: object = {};
  mapView: esri.MapView;
  mapViewProperties: esri.MapViewProperties;
  webMap: esri.WebMap;
  webMapPortalId = 'babd5a79678a47b6b3654768530863f8';
  webMapProperties: esri.WebMapProperties;
  featureLayer: esri.FeatureLayer;

  @Input()
  featureLayerUrl: string;

  @Input()
  definitionExpression: string;

  @Output()
  mapLoaded = new EventEmitter<boolean>();

  @ViewChild('mapViewNode', { static: false })
  private mapViewNodeElementRef: ElementRef;

  constructor(private layerService: LayerService) {
    this.esriLoaderOptions = {
      url: 'https://js.arcgis.com/4.12/',
      css: true
    };
    loadModules([
      'esri/WebMap',
      'esri/geometry/SpatialReference',
    ], this.esriLoaderOptions)
      .then(([
        WebMap
      ]) => {
        this.webMapProperties = {
          portalItem: {
            id: this.webMapPortalId
          }
        };
        this.webMap = new WebMap(this.webMapProperties);
      });
  }

  ngOnInit() {
    this.createMapView();
  }

  ngOnChanges() {
    this.changeMapLayer();
  }

  createMapView() {
    loadModules([
      'esri/views/MapView'
    ], this.esriLoaderOptions)
      .then(([
        MapView
      ]) => {
        this.mapViewProperties = {
          container: this.mapViewNodeElementRef.nativeElement,
          map: this.webMap
        };
        this.mapView = new MapView(this.mapViewProperties);
        this.mapView.when(() => {
          // All the resources in the MapView and the map have loaded. Now execute additional processes
          this.mapLoaded.emit(true);
        }, err => {
          console.error(err);
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  changeMapLayer() {
    loadModules([
      'esri/layers/FeatureLayer'
    ], this.esriLoaderOptions)
      .then(([
        FeatureLayer
      ]) => {
        if (this.featureLayerUrl) {

          this.featureLayer = new FeatureLayer({
            url: this.featureLayerUrl,
            outFields: ['*']
          });

          if (this.definitionExpression) {
            this.featureLayer.definitionExpression = this.definitionExpression;
          }

          this.mapView.map.removeAll();
          this.mapView.map.add(this.featureLayer);

          this.featureLayer.when(() => {
            return this.featureLayer.queryExtent();
          }).then((response) => {
            if (response.extent) {
              this.mapView.goTo(response.extent);
            }
          });
          this.changeMapClickEvent();
        } else {
          if (this.mapView && this.mapView.map) {
            this.mapView.map.removeAll();
          }
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  changeMapClickEvent() {
    if (this.featureLayerUrl) {
      this.mapView.on('click', event => {
        this.mapView.hitTest(event).then(response => {
          if (response.results.length) {
            const graphic = response.results.filter(result => {
              return result.graphic.layer === this.featureLayer;
            })[0].graphic;

            this.layerService.selectedFeatureAttributes = Object.keys(graphic.attributes).map(key => {
              return [key, graphic.attributes[key]];
            });
          }
        });
      });
    } else {
      this.layerService.selectedFeatureAttributes = [];
    }
  }
}
