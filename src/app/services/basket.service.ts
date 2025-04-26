import { Injectable } from '@angular/core';
import { Tour } from '../models/tours';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private basketStore: Tour[] = [];               //хранит все добавленные туры в корзину
  private basketSubject = new BehaviorSubject(this.basketStore);
  basketStore$ = this.basketSubject.asObservable();

  constructor() { }

  setItemToBasket(item: Tour): void {
    this.basketStore.push(item);
    item.inBasket = true;
    this.basketSubject.next(this.basketStore);
  }

  removeItemFromBasket(item: Tour):void {
    this.basketStore = this.basketStore.filter((tour) => tour !== item);
    item.inBasket = false;
    this.basketSubject.next(this.basketStore);
  }

}
