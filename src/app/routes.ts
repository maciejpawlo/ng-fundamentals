import { Routes } from "@angular/router";
import { Error404Component } from "./errors/error404.component";
import { CreateEventComponent } from "./events/create-event.component";
import { CreateSessionComponent } from "./events/event-details/create-session.component";
import { EventDetailsComponent } from "./events/event-details/event-details.component";
import { EventRouteActivatorGuard } from "./events/event-details/event-route-activator.guard";
import { EventRouteResolverService } from "./events/event-details/event-route-resolver.service";
import { EventResolver } from "./events/event-resolver.service";
import { EventsListComponent } from "./events/events-list.component";

export const appRoutes: Routes = [
  {path: 'events', component: EventsListComponent, resolve: {events: EventRouteResolverService}},
  {path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent']},
  {path: 'events/:id', component: EventDetailsComponent, resolve: {event: EventResolver}},
  {path:'events/session/new', component: CreateSessionComponent} ,
  {path: '404', component: Error404Component},
  {path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)}, //działa
  //{path: 'user', loadChildren: './user/user.module#UserModule'}, // deprecated
  {path: '', redirectTo: 'events', pathMatch: 'full'},
  {path: '**', redirectTo: 'events', pathMatch: 'full'}
]
