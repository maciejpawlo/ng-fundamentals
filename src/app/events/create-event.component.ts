import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEvent } from './shared/event.model';
import { EventService } from './shared/event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  isDirty: boolean = true;
  newEvent!: IEvent;
  constructor(private router: Router, private eventService: EventService) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.router.navigate(['/events']);
  }
  saveEvent(formValues: any): void {
    this.eventService.saveEvent(formValues);
    this.isDirty = false;
    this.router.navigate(['/events']);
  }
}
