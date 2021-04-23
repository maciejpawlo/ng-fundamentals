import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from '../common/toastr.service';
import { IEvent } from './shared/event.model';
import { EventService } from './shared/event.service';

@Component({
  selector: 'events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {

  events!: IEvent[];
  constructor(private eventService: EventService,
    private toastr: ToastrService, private route:ActivatedRoute) { }



  ngOnInit(): void {
    // this.eventService.getEvents().subscribe({
    //   next: ev => {
    //     this.events = ev;
    //   }
    // }); //resolver robi to
    this.events = this.route.snapshot.data['events']; //przypisanie danych z resolvera
  }

  handleThumbnailClick(eventName: string): void {
    this.toastr.succes(eventName);
  }
}
