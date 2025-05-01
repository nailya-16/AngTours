import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { IOrder } from '../../models/orders';
import { CommonModule } from '@angular/common';
import { TouristsCountPipe } from '../../shared/pipes/tourists-count.pipe';
import { FullNamePipe } from '../../shared/pipes/full-name.pipe';


@Component({
  selector: 'app-orders',
  imports: [CommonModule, TouristsCountPipe, FullNamePipe],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  
  orders: IOrder[] = [];

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.ordersService.getOrders().subscribe(data => {
      this.orders = data;
    });
  }
}