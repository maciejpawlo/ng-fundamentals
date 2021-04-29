import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { EventsAppComponent } from './events-app.component';
import { EventsListComponent } from './events/events-list.component';
import { EventThumnbnailComponent } from './events/event-thumnbnail.component';
import { NavbarComponent } from './nav/navbar.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { CreateEventComponent } from './events/create-event.component';
import { Error404Component } from './errors/error404.component';
import { ProfileComponent } from './user/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateSessionComponent } from './events/event-details/create-session.component';
import { SessionListComponent } from './events/event-details/session-list.component';
import { CollapsibleWellComponent } from './common/collapsible-well/collapsible-well.component';
import { DurationPipe } from './events/shared/duration.pipe';
import { Toastr, TOASTR_TOKEN } from './common/toastr2.service';

let toastr:Toastr = (window as {[key: string]: any})['toastr'];
//declare let toastr:any;
@NgModule({
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumnbnailComponent,
    NavbarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    DurationPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [{provide: 'canDeactivateCreateEvent', useValue: checkDirtyState},
  {provide: TOASTR_TOKEN, useValue: toastr }],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

export function checkDirtyState(component: CreateEventComponent){
  if (component.isDirty) {
    return window.confirm("You have not saved this event, do you really want to cancael?")
  }
  return true;
} //testowo guard jako metoda, lepiej jako service
