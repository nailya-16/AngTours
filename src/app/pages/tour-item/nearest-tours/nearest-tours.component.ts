import { Component, inject, Input, model, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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

  tourService = inject(ToursService);
  toursArr = model<Tour[]>([]);

  ngOnInit(): void {
    console.log('tourNearest', this.tourNearest)
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes)
    const tour = changes['tourNearest']?.currentValue as Tour;

    if (tour?.locationId) {
      this.tourService.getNearestTourByLocationId(tour.locationId).subscribe((data) => {
        this.toursArr.set(data);
      });

    }
  }
}
