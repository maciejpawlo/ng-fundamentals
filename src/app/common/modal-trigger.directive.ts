import { Directive, ElementRef, Inject, Input, OnInit } from '@angular/core';
import { JQ_TOKEN } from './jQuery.service';

@Directive({
  selector: '[modal-trigger]'
})
export class ModalTriggerDirective implements OnInit {
  private element!: HTMLElement;
  @Input('modal-trigger') modalId: string = '';

  constructor(@Inject(JQ_TOKEN) private $:any, element: ElementRef) {
    this.element = element.nativeElement; //stworzenie referencji do elementu z DOM
  }

  ngOnInit(): void {
    this.element.addEventListener('click', e=> {
      this.$(`#${this.modalId}`).modal({});
    });
  }

}
