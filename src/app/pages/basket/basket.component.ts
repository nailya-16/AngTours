import { Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { BasketService } from '../../services/basket.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Tour } from '../../models/tours';

@Component({
  selector: 'app-basket',
  imports: [TableModule, AsyncPipe, CommonModule],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent {
  basketItems$ = inject(BasketService).basketStore$;

  constructor(private basketService: BasketService) {}

  removeTour(tour: Tour): void {
    this.basketService.removeItemFromBasket(tour);
  }
}
