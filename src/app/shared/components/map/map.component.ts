import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ILocation } from '../../../models/tours';
//map
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';

//add projection
import * as olProj from 'ol/proj';

@Component({
  selector: 'map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {
  @Input() location: ILocation;
  @ViewChild('map') mapDom: ElementRef;
  map: Map;

  ngAfterViewInit(): void {
    
    this.map = new Map({
      target: this.mapDom.nativeElement,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: olProj.fromLonLat([this.location.lng, this.location.lat]),
        zoom: 5,
      }),
    });
  }
}
