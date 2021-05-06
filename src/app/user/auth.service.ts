import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, last, tap } from 'rxjs/operators';
import { IUser } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser!: IUser;
  constructor(private http: HttpClient) { }
  //server using passport lib
  loginUser(userName: string, password: string){
    let loginInfo = { username: userName, password: password};
    let options = { headers: new HttpHeaders({'Content-Type': 'application/json'})};

    return this.http.post('/api/login', loginInfo, options)
      .pipe(tap((data: any)=>{
        this.currentUser = data['user'] as IUser;
      }))
      .pipe(catchError(err => {
        return of(false);
      }));

    // this.currentUser = {
    //   id: 1,
    //   userName: userName,
    //   firstName: 'John',
    //   lastName: 'Papa',
    // } //todo
  }

  logout(){
    this.currentUser = undefined!;
    let options = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post('/api/logout', {}, options);
  }

  isAuthenticated(): boolean{
    return !!this.currentUser;
  }

  checkAuthenticationStatus() {
    this.http.get('/api/currentIdentity')
    .pipe(tap(data =>{
      if (data instanceof Object) {
        this.currentUser = data as IUser;
      }
    })).subscribe();
  }

  updateCurrentUser(firstName: string, lastName:string) {
    let options = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.put(`/api/users/${this.currentUser.id}`, this.currentUser, options);
    //todo
    // this.currentUser.firstName = firstName;
    // this.currentUser.lastName = lastName;
  }
}
