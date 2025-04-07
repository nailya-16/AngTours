import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Tour } from '../../../models/tours';

@Component({
  selector: 'app-nearest-tours',
  imports: [],
  templateUrl: './nearest-tours.component.html',
  styleUrl: './nearest-tours.component.scss'
})
export class NearestToursComponent implements OnInit, OnChanges{
  @Input() tourNearest: Tour = null;

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }
}
