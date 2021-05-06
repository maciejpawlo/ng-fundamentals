import { Component, OnInit } from '@angular/core';
import { IEvent, ISession } from '../events/shared/event.model';
import { EventService } from '../events/shared/event.service';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  searchTerm: string = "";
  foundSessions: any[] = [];
  events: IEvent[] = [];

  constructor(public auth:AuthService, private eventService:EventService) { }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe({
      next: e => {
        this.events = e;
      }
    })
  }

  searchSessions(searchTerm: string): void {
    this.eventService.searchSessions(searchTerm).subscribe({
      next: sessions => {
        this.foundSessions = sessions;
        console.log(this.foundSessions);
      },
      error: e => {

      },
    });


  }
}
