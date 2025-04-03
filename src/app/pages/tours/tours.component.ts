import { Component, OnInit } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import { CardModule} from 'primeng/card'
import { ActivatedRoute, Router } from '@angular/router';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Tour } from '../../models/user';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tours',
  imports: [CardModule, InputGroupModule, InputGroupAddonModule, ButtonModule, InputTextModule,SearchPipe, FormsModule],
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css']
})
export class ToursComponent implements OnInit {
  tours: Tour[] = [];
  toursStore: Tour[] = [];
  searchValue = '';

  constructor(private toursService: ToursService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.toursService.getTours().subscribe((data) => {
      if (Array.isArray(data?.tours)) {
        this.tours = data.tours;
        this.toursStore = [...data.tours];
      }
    });
  }

  goToTour(item: Tour): void { 
    this.router.navigate(['tour', item.id], {relativeTo: this.route});
  }

  searchTour(ev: Event): void {
    const target = ev.target as HTMLInputElement;
    const targetValue = target.value;
    this.tours = this.toursService.searchTours(this.toursStore, targetValue)
  }
}