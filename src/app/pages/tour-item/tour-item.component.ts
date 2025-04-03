import { Component, OnInit } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import { ActivatedRoute } from '@angular/router';
import { Tour } from '../../models/user'; 

@Component({
  selector: 'app-tour-item',
  imports: [],
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
