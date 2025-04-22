import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import { CardModule} from 'primeng/card'
import { ActivatedRoute, Router } from '@angular/router';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ILocation, Tour } from '../../models/tours';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { HighlightActiveDirective } from '../../shared/directives/highlight-active.directive';
import { isValid } from "date-fns";
import { Subject, Subscription, takeUntil } from 'rxjs';
import { MapComponent } from '../../shared/components/map/map.component';
import { DialogModule } from 'primeng/dialog'

@Component({
  selector: 'app-tours',
  imports: [
    CardModule,
    InputGroupModule, 
    InputGroupAddonModule, 
    ButtonModule, 
    InputTextModule,
    SearchPipe, 
    FormsModule, 
    HighlightActiveDirective,
    MapComponent,
    DialogModule
  ],
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.scss'
})
export class ToursComponent implements OnInit, OnDestroy {
  tours: Tour[] = [];
  toursStore: Tour[] = [];
  tourType: any = null;
  tourDate: any = null;
  destroyer = new Subject<boolean>();
  showModal = false;
  location: ILocation = null;

  constructor(private toursService: ToursService,
              private route: ActivatedRoute,
              private router: Router) {}
  
  
  ngOnInit(): void {

    //Types
    this.toursService.tourType$.pipe(takeUntil(this.destroyer)).subscribe((tourKey: string) => {
      this.tourType = tourKey;
      this.initFilterLogic();
    })

    
    
    //Date
    this.toursService.tourDate$.pipe(takeUntil(this.destroyer)).subscribe((date) => {
      this.tourDate = date;
      console.log('****date', date)

        this.initFilterLogic();
    })

    this.toursService.getTours().subscribe((data) => {
      if (Array.isArray(data)) {
        this.tours = data;
        this.toursStore = [...data];
      }
    });
  }
  ngOnDestroy(): void {
    this.destroyer.next(true);
    this.destroyer.complete();
  }
  goToTour(item: Tour): void { 
    this.router.navigate(['tour', item.id], {relativeTo: this.route});
  }
  initFilterLogic() {
    if (this.tourDate) {
      this.tours = this.toursStore.filter((tour) => {
        if (isValid(new Date(tour.date))) {
          const tourDate = new Date(tour.date).setHours(0, 0, 0, 0);    //обнуляем часы/минуты/секунды/миллисекунды
          console.log('****tourDate', tourDate)
          const calendarDate = new Date(this.tourDate).setHours(0, 0, 0);        //обнуляем часы/минуты/секунды
          console.log('****calendarDate', calendarDate)
          return tourDate === calendarDate;
        } else {
          return false;
        }
      })
    }

    if (this.tourType) {
     const tourStore = this.tourDate ? this.tours : this.toursStore;
      switch (this.tourType) {
        case 'group':
          this.tours = tourStore.filter((el) => el.type === 'group')
        break;
        case 'single':
          this.tours = tourStore.filter((el) => el.type === 'single')
        break;
        case 'all':
          this.tours = [...tourStore];
        break;
      }
    }
  }
  searchTour(ev: Event): void {
    const target = ev.target as HTMLInputElement;
    const targetValue = target.value;
    this.tours = this.toursService.searchTours(this.toursStore, targetValue)
  }

  selectActive(index: number): void {
    console.log('index', index)
    const targetTour = this.tours.find((tour, i) => i === index);
    if(targetTour) {
      this.goToTour(targetTour);
    }
  }

  getCountryDetail(ev: Event, code: string): void {
    ev.stopPropagation();                                                          //TODO check
    this.toursService.getCountryByCode(code).subscribe((data) => {
      if (Array.isArray(data)) {
        const countryInfo = data[0];
        console.log('countryInfo', countryInfo)
        this.location = {lat: countryInfo.latlng[0], lng: countryInfo.latlng[1]};   //сохранение локации, координат
        this.showModal = true;                                                      //отображение модального окна
      }
    })
  }
}