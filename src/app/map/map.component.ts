import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { loadModules } from 'esri-loader';
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
  spatialReference: esri.SpatialReference;
  spatialReferenceProperties: esri.SpatialReferenceProperties;

  @Input()
  mapLayer: any;

  @Output()
  mapLoaded = new EventEmitter<boolean>();

  @ViewChild('mapViewNode', { static: false })
  private mapViewNodeElementRef: ElementRef;

  constructor() {
    this.esriLoaderOptions = {
      url: 'https://js.arcgis.com/4.12/',
      css: true
    };
    loadModules([
      'esri/WebMap',
      'esri/geometry/SpatialReference',
    ], this.esriLoaderOptions)
      .then(([
        WebMap,
        SpatialReference
      ]) => {
        this.webMapProperties = {
          portalItem: {
            id: this.webMapPortalId
          }
        };

        this.webMap = new WebMap(this.webMapProperties);

        this.spatialReferenceProperties = {
          wkid: 3857
        };
        this.spatialReference = new SpatialReference(this.spatialReferenceProperties);
      });
  }

  ngOnInit() {
    this.createMapView();
  }

  ngOnChanges() {
    this.createMapView();
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

}
