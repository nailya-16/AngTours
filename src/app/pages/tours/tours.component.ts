import { Component, OnInit } from '@angular/core';
import { ToursService } from '../../services/tours.service';

@Component({
  selector: 'app-tours',
  imports: [],
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.css',
})
export class ToursComponent implements OnInit { 

  constructor(private toursService: ToursService){}

  ngOnInit(): void {
    this.toursService.getTours().subscribe();
  }
}
