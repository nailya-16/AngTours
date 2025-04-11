import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-change-password',
  imports: [ ButtonModule, InputTextModule, FormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  changePassword() {
    if (this.newPassword === this.confirmPassword) {

      console.log('Пароль успешно изменен');
    } else {
      console.error('Пароли не совпадают');
    }
  }
}
