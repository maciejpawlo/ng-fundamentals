import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { JQ_TOKEN } from './jQuery.service';

@Component({
  selector: 'simple-modal',
  templateUrl: './simple-modal.component.html',
  styleUrls: ['./simple-modal.component.css']
})
export class SimpleModalComponent implements OnInit {
  @Input() title: string = '';
  @Input() elementID : string = '';
  @Input() closeOnBodyClick: string = '';
  @ViewChild('modalcontainer') containerEl!: ElementRef;

  constructor(@Inject(JQ_TOKEN) private $:any) { }

  ngOnInit(): void {
  }

  closeModal(): void {
    if (this.closeOnBodyClick.toLowerCase() === 'true') {
      this.$(this.containerEl.nativeElement).modal('hide');
    }

  }

}