import { Injectable } from '@angular/core';
import { IUser, IUserRegister } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { API } from '../shared/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUser: IUser | null = null;

  constructor(private http: HttpClient) { }

  registerUser(user: IUserRegister): Observable<string> {
    return this.http.post(API.registration, user, {responseType: 'text'});
  }

  authUser (user: IUser): Observable<any> {
    return this.http.post(API.auth, user, {responseType: 'text'});
  }

  getUser(): IUser {
    return this.currentUser
  }
  setUser(user: IUser): void {
    this.currentUser = user;
  }
}
  
  // addUser(user: IUser, isRememberMe?: boolean): true | string {
  //   if (this.getUser(user.login)) {
  //     return 'User already exists';
  //   }
  //   this.userStorage.push(user);
  //   return true;
  // }

  // checkUser(login: string): boolean {
  //   return !!this.getUser(login);
  // }

  // authenticateUser (credentials: { login: string; password: string }): boolean {
  //   const user = this.getUser(credentials.login);
  //   if (user && user.password === credentials.password) {
  //     this.currentUser  = user;
  //     return true; 
  //   }
  //   return false;
  // }