import { Component, OnInit } from '@angular/core';
import { AuthService } from './user/auth.service';

@Component({
  selector: 'events-app',
  templateUrl: './app.component.html',
  //styleUrls: ['./app.component.css']
})
export class EventsAppComponent implements OnInit {
  constructor(private auth: AuthService){}

  ngOnInit() {
    this.auth.checkAuthenticationStatus();
  }
}
