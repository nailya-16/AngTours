import { Component, EventEmitter, inject, Input, model, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Tour } from '../../../models/tours';
import { ToursService } from '../../../services/tours.service';
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-nearest-tours',
  imports: [GalleriaModule],
  templateUrl: './nearest-tours.component.html',
  styleUrl: './nearest-tours.component.scss'
})
export class NearestToursComponent implements OnInit, OnChanges{
  @Input() tourNearest: Tour = null;
  @Output() onTourChange = new EventEmitter<Tour>();

  tourService = inject(ToursService);
  toursArr = model<Tour[]>([]);
  activeLocationId: string;

  ngOnInit(): void {
    console.log('tourNearest', this.tourNearest)
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes)
    const tour = changes['tourNearest']?.currentValue as Tour;

    if (tour?.locationId && this.activeLocationId !== tour?.locationId) {
      this.activeLocationId = tour?.locationId;
      this.tourService.getNearestTourByLocationId(this.activeLocationId).subscribe((data) => {
        this.toursArr.set(data);
      });

    }
  }

  activeIndexChange(index: number) {
    console.log('index', index);
    const tours = this.toursArr();
    const activeTour = tours.find((el, i) => i === index);

    this.onTourChange.emit(activeTour);

  }
}
