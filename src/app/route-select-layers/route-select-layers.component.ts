import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-route-select-layers',
  templateUrl: './route-select-layers.component.html',
  styleUrls: ['./route-select-layers.component.scss']
})
export class RouteSelectLayersComponent implements OnInit {

  category: string;
  layer: string;

  constructor() { }

  ngOnInit() {
  }

}
