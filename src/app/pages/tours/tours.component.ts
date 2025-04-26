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
import { CommonModule } from '@angular/common';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { UserService } from '../../services/user.service';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'app-tours',
  imports: [
    CommonModule,
    CardModule,
    InputGroupModule, 
    InputGroupAddonModule, 
    ButtonModule, 
    InputTextModule,
    SearchPipe, 
    FormsModule, 
    HighlightActiveDirective,
    MapComponent,
    DialogModule,
    ConfirmDialogModule
  ],
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.scss'],
  providers: [ConfirmationService]
})
export class ToursComponent implements OnInit, OnDestroy {
  tours: Tour[] = [];
  toursStore: Tour[] = [];
  tourType: any = null;
  tourDate: any = null;
  destroyer = new Subject<boolean>();
  showModal = false;
  location: ILocation = null;
  weatherInfo: any = null;
  isAdmin: boolean = false;
  selectedTourId: string | null = null; // для хранения ID выбранного тура для удаления

  constructor(private toursService: ToursService,
              private route: ActivatedRoute,
              private router: Router,
              private confirmationService: ConfirmationService,
              private userService: UserService,
              private basketService: BasketService
            ) {}
  
  
  ngOnInit(): void {
    this.isAdmin = this.userService.getUser()?.login === "admin";
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

  confirmDelete(ev: Event, tourId: string): void {
    ev.stopPropagation(); 
    this.selectedTourId = tourId;
    this.confirmationService.confirm({
      message: 'Вы уверены, что хотите удалить этот тур?',
      header: 'Подтверждение',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteTour();
      },
      reject: () => {
      }
    });
  }

  deleteTour(): void {
    if (this.selectedTourId) {
      this.toursService.deleteTourById(this.selectedTourId).subscribe(() => {
        this.tours = this.tours.filter(tour => tour.id !== this.selectedTourId);
        this.showModal = false; 
        this.selectedTourId = null; 
      });
    }
  }

  hideConfirmDialog(): void {
    this.showModal = false; 
    this.selectedTourId = null;
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
      if (data) {
        const countrieInfo = data.countrieData;
        console.log('countryInfo', countrieInfo)
        this.location = {lat: countrieInfo.latlng[0], lng: countrieInfo.latlng[1]};   //сохранение локации, координат
        this.weatherInfo = data.weatherData;                               //сохранение информации о погоде
        this.showModal = true;                                                      //отображение модального окна
      }
    })
  }

  setItemToBasket(ev: Event, item: Tour): void {
    ev.stopPropagation();
    this.basketService.setItemToBasket(item);
  }
  removeItemFromBasket(ev: Event, item: Tour): void {
    ev.stopPropagation();
    this.basketService.removeItemFromBasket(item);
  }
}