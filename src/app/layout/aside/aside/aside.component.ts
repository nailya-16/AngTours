import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { ToursService } from '../../../services/tours.service';
import { DatePickerModule } from 'primeng/datepicker';
import { ITourType } from '../../../models/tours';

@Component({
  selector: 'app-aside',
  imports: [SelectModule, FormsModule, DatePickerModule],
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  private tourService = inject(ToursService);

  date: Date = null; // или new Date()

  selectedType: ITourType | null = null; //TODO defined type

  showInBasketOnly: boolean = false; // состояние чекбокса

  tourTypes: ITourType[] = [
    { key: 'single', label: 'Одиночный' },
    { key: 'group', label: 'Групповой' },
    { key: 'all', label: 'Все' }
  ];

  ngOnInit(): void {
    this.selectedType = this.tourTypes.find((type) => type.key === 'all');
  }

  changeTourType(ev: SelectChangeEvent): void {
    this.tourService.initChangeTourType(this.selectedType?.key);
  }

  changeDate(ev: Date): void {
    console.log('date', ev);
    this.tourService.initChangeTourDate(ev);
  }

  clearDate(): void {
    this.date = null; // Сбрасываем дату
    this.tourService.initChangeTourDate(this.date); 
    this.tourService.initChangeTourType(this.selectedType?.key); // обновляем туры по типу
  }

  toggleShowInBasketOnly(): void {
    this.tourService.initShowInBasketOnly(this.showInBasketOnly); 
  }
}
