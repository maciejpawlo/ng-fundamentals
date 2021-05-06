import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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
  filterby:string = 'all';
  sortBy!: string;

  constructor(private eventService: EventService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.forEach((params: Params)=> {
      // this.eventService.getEvent(+params['id']).subscribe({
      //   next: e => {
      //     this.event = e;
      //     this.addMode=false;
      //   }
      // }) //MOZNA TEZ PRZEZ RESOLVER
      this.event = this.route.snapshot.data['event'];
      this.addMode=false;
    }) //foreach => tak samo jakby na kazdym wywolac subscribe

    // let id = +this.route.snapshot.params['id'];
    // this.event = this.eventService.getEvent(id);
  }

  addSession() {
    this.addMode = !this.addMode;
  }

  saveSession(newSession: ISession): void {
    const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));
    newSession.id = nextId + 1;
    this.event.sessions.push(newSession);
    //this.eventService.updateEvent(this.event);
    this.eventService.saveEvent(this.event).subscribe();
    this.addMode = false;
  }

  cancelAdd(): void {
    this.addMode = !this.addMode;;
  }
}
