import { Component, OnInit } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Tour } from '../../models/tours'; 
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-tour-item',
  imports: [CardModule, ButtonModule, NgIf, RouterLink],
  templateUrl: './tour-item.component.html',
  styleUrls: ['./tour-item.component.scss']
})
export class TourItemComponent implements OnInit {
  tourId!: string;
  tour!: Tour; 

  constructor(private toursService: ToursService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.tourId = this.route.snapshot.paramMap.get('id')!;
    this.toursService.getTourById(this.tourId).subscribe((response) => {
      this.tour = response; // Записываем ответ от сервера
    });
  }
}
