import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/user/auth.service';
import { ISession } from '../shared/event.model';
import { VotersService } from './voters.service';

@Component({
  selector: 'session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnInit, OnChanges {

  @Input() sessions: ISession[] = [];
  @Input() filterBy!: string;
  @Input() sortBy!: string;
  @Input() eventId!: number;

  visibleSessions: ISession[] = [];
  constructor(private auth: AuthService, private voterService: VotersService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.sessions) {
      this.filterSessions(this.filterBy);
      this.sortBy === 'name' ? this.visibleSessions.sort(sortByNameAsc) : this.visibleSessions.sort(sortByVotesDsc);
    }
  } //called when one of input variables is changed ---> mozna tez propertiesami to zrobic

  ngOnInit(): void {
  }

  isUpvoteVisible(){
    return this.auth.isAuthenticated();
  }

  filterSessions(filter: string): void {
    if (filter === 'all') {
      this.visibleSessions = this.sessions.slice(0);
    } else {
      this.visibleSessions = this.sessions.filter(s=>s.level.toLowerCase() === filter);
    }
  }

  toggleVote(session:ISession) {
    if (this.userHasVoted(session)) {
      this.voterService.deleteVoter(this.eventId,session,this.auth.currentUser.userName);
    } else {
      this.voterService.addVoter(this.eventId,session,this.auth.currentUser.userName);
    }//changing voters -> update sort
    if (this.sortBy === 'votes') {
      this.visibleSessions.sort(sortByVotesDsc);
    }
  }

  userHasVoted(session:ISession): boolean{
    return this.voterService.userHasVoted(session, this.auth.currentUser.userName);
  }
}

function sortByNameAsc(s1: ISession, s2: ISession) {
 if (s1.name > s2.name) {
    return 1;
 } else if (s1.name === s2.name){
   return 0;
 } else {
   return -1;
 }

};

function sortByVotesDsc(s1: ISession, s2: ISession) {
  return s2.voters.length - s1.voters.length;
};
