import { Component, OnInit } from '@angular/core';
import { ISession } from '../events/shared/event.model';
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

  constructor(public auth:AuthService, private eventService:EventService) { }

  ngOnInit(): void {
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
