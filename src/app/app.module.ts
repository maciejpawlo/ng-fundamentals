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
import { JQ_TOKEN } from './common/jQuery.service';
import { SimpleModalComponent } from './common/simple-modal.component';
import { ModalTriggerDirective } from './common/modal-trigger.directive';
import { UpvoteComponent } from './events/event-details/upvote.component';
import { LocationValidatorDirective } from './events/location-validator.directive';
import { HttpClientModule } from '@angular/common/http';

let toastr:Toastr = (window as {[key: string]: any})['toastr'];
let jQuery = (window as {[key: string]: any})['$'];
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
    SimpleModalComponent,
    ModalTriggerDirective,
    UpvoteComponent,
    LocationValidatorDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [{provide: 'canDeactivateCreateEvent', useValue: checkDirtyState},
  {provide: TOASTR_TOKEN, useValue: toastr },
  {provide: JQ_TOKEN, useValue: jQuery}
],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

export function checkDirtyState(component: CreateEventComponent){
  if (component.isDirty) {
    return window.confirm("You have not saved this event, do you really want to cancael?")
  }
  return true;
} //testowo guard jako metoda, lepiej jako service
