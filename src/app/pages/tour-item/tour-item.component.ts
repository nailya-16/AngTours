import { Component, OnInit } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Tour } from '../../models/tours'; 
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Location } from '@angular/common';
import { NearestToursComponent } from './nearest-tours/nearest-tours.component';

@Component({
  selector: 'app-tour-item',
  imports: [CardModule, ButtonModule, NearestToursComponent, RouterLink],
  templateUrl: './tour-item.component.html',
  styleUrls: ['./tour-item.component.scss']
})
export class TourItemComponent implements OnInit {
  tourId!: string;
  tour!: Tour; 

  constructor(private toursService: ToursService,
    private route: ActivatedRoute,
    private location: Location) {}

  ngOnInit(): void {
    this.tourId = this.route.snapshot.paramMap.get('id')!;
    this.toursService.getTourById(this.tourId).subscribe((response) => {
      this.tour = response; // Записываем ответ от сервера
    });
  }

  onTourChanges(ev: Tour): void {
    this.tour = ev;
    this.location.replaceState('tours/tour'+this.tour .id);
  }
}
