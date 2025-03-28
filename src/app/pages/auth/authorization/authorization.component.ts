import { NgClass } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { IUser } from '../../../models/user';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-authorization',
  imports: [NgClass, FormsModule, ButtonModule, InputTextModule],
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
})
export class AuthorizationComponent implements OnInit, OnDestroy {
  login: string = '';
  password: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  onAuth(): void {
    const user: IUser = {
      login: this.login,
      password: this.password,
    };

    this.userService.authUser (user).subscribe({
      next: (response) => {
        this.router.navigate(['tickets']);
        this.initToast('success', 'Авторизация прошла успешно');
      },
      error: (error) => {
        console.error('Ошибка при авторизации:', error);
        this.initToast('error', error.error.message || 'Ошибка авторизации. Попробуйте еще раз.');
      }
    });
  }

  initToast(type: 'error' | 'success', text: string): void {
    this.messageService.add({ severity: type, detail: text, life: 3000 });
  }
}
