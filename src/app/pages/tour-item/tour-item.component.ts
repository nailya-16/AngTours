import { Component, OnInit } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tour-item',
  imports: [],
  templateUrl: './tour-item.component.html',
  styleUrl: './tour-item.component.scss'
})
export class TourItemComponent implements OnInit{
  tourId: string = null;
  constructor(private tourService: ToursService, private route: ActivatedRoute){ }

  ngOnInit(): void {
    this.tourId = this.route.snapshot.paramMap.get('id');
    //console.log('tourId', this.tourId) 
  }
}
