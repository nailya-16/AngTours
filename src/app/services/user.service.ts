import { Injectable } from '@angular/core';
import { IUser, IUserRegister } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { API } from '../shared/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userKey = 'currentUser ';

  constructor(private http: HttpClient) { }

  registerUser (user: IUserRegister): Observable<string> {
    return this.http.post(API.registration, user, { responseType: 'text' });
  }

  authUser (user: IUser): Observable<any> {
    return this.http.post(API.auth, user, { responseType: 'text' });
  }

  //метод для получения пользователя
  getUser (): IUser | null {
    const user = sessionStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  //метод для установки пользователя
  setUser (user: IUser | null): void {
    if (user) {
      sessionStorage.setItem(this.userKey, JSON.stringify(user)); // Сохраняем в sessionStorage
    } else {
      sessionStorage.removeItem(this.userKey); // Удаляем из sessionStorage
    }
  }
}