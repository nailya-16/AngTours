import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { IUser } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { Observable } from 'rxjs';
import { Tour } from '../../../models/tours';
import { BasketService } from '../../../services/basket.service';

@Component({
  selector: 'app-header',
  imports: [DatePipe, 
    MenubarModule, 
    ButtonModule,
    OverlayBadgeModule,
    AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  //encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit, OnDestroy {
  dateTime: Date;
  menuItems: MenuItem[] = [];
  user: IUser;
  logoutIcon = 'pi pi-user';
  basketStore$: Observable<Tour[]> = null;

  constructor(private userService: UserService, 
    private router: Router, 
    private ngZone: NgZone,
    private basketService: BasketService,
  ) {}

  ngOnInit(): void {

    this.basketStore$ = this.basketService.basketStore$;

    this.user = this.userService.getUser();
    this.menuItems = this.initMenuItems();

    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.dateTime = new Date();
      }, 1000);
    })

  }

  ngOnDestroy(): void {}

  initMenuItems(): MenuItem[] {
    return [
      {
        label: 'Билеты',
        routerLink: ['/tours'],
      },
      {
        label: 'Настройки',
        routerLink: ['/tours/settings'],
      },
      {
        label: 'Заказы',
        routerLink: ['/tours/orders'],
      },
    ];
  }

  logOut(): void {
    this.userService.setUser(null);
    this.router.navigate(['/auth']);
  }

  hoverLogoutBtn(val: boolean): void {
    this.logoutIcon = val ? 'pi pi-sign-out' : 'pi pi-user';
  }

  navigateToBasket(): void {
    this.router.navigate(['/tours/basket']);
}
}
