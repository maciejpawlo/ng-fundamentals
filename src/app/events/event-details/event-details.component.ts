import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEvent, ISession } from '../shared/event.model';
import { EventService } from '../shared/event.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  addMode:boolean = false;
  event!: IEvent;
  constructor(private eventService: EventService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    this.event = this.eventService.getEvent(id);
  }


  addSession() {
    this.addMode = !this.addMode;
  }

  saveSession(newSession: ISession): void {
    const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));
    newSession.id = nextId + 1;
    this.event.sessions.push(newSession);
    this.eventService.updateEvent(this.event);
    this.addMode = false;
  }

  cancelAdd(): void {
    this.addMode = !this.addMode;;
  }
}
