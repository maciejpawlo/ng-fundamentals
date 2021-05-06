import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'upvote',
  templateUrl: './upvote.component.html',
  styleUrls: ['./upvote.component.css']
})
export class UpvoteComponent implements OnInit {

  @Input() set voted(val: boolean){
    this.iconColor = val ? 'red' : 'white';
  }
  @Input() count!: number;
  @Output() vote = new EventEmitter<void>();
  iconColor!: string;
  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    this.vote.emit();
  }
}
