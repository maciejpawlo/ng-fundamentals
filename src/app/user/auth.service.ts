import { Injectable } from '@angular/core';
import { last } from 'rxjs/operators';
import { IUser } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser!: IUser;
  constructor() { }

  loginUser(userName: string, password: string){
    this.currentUser = {
      id: 1,
      userName: userName,
      firstName: 'John',
      lastName: 'Papa',
    } //todo
  }

  isAuthenticated(): boolean{
    return !!this.currentUser;
  }

  updateCurrentUser(firstName: string, lastName:string) {
    //todo
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;
  }
}
