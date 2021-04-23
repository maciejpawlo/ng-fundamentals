import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IEvent } from './shared/event.model';

@Component({
  selector: 'event-thumnbnail',
  templateUrl: './event-thumnbnail.component.html',
  styleUrls: ['./event-thumnbnail.component.css']
})
export class EventThumnbnailComponent implements OnInit {

  @Input() event!: IEvent

  constructor() { }

  ngOnInit(): void {
  }

  getStartTimeClass(): any {
    const isEarlyStart = this.event && this.event.time ==='8:00 am';
    return {green: isEarlyStart, bold: isEarlyStart};
  } //można zwrócić Object, string, tablice stringów

  getStartTimeStyle(): any {
    if (this.event && this.event.time === '8:00 am'){
      return {color: '#003300', 'font-weight': 'bold'};
    }
    return {};
  }//zwracamy object
}
