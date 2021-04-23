import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISession } from '../shared/event.model';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.css']
})
export class CreateSessionComponent implements OnInit {
  name!: FormControl;
  presenter!: FormControl;
  duration!: FormControl;
  level!: FormControl;
  abstract!: FormControl;

  newSessionForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.name = new FormControl('', Validators.required);
    this.presenter = new FormControl('', Validators.required);
    this.duration = new FormControl('', Validators.required);
    this.level = new FormControl('', Validators.required);
    this.abstract = new FormControl('', [Validators.required, Validators.maxLength(400), this.restrictedWords(['foo','bar'])]);

    this.newSessionForm = new FormGroup({
      name: this.name,
      presenter: this.presenter,
      duration: this.duration,
      level: this.level,
      abstract: this.abstract
    });
  }

  // private restrictedWords(control: FormControl): {[key: string]: any} {
  //   return control.value.includes('foo') ? {'restrictedWord': 'foo'} : null!;
  // } //todo zmienic pozniej na directive

  private restrictedWords(words: string[]) {
    return (control: FormControl): {[key: string]: any} => {
      if (!words) {
        return null!;
      }
      //words.some(x=>control.value.includes(x))
      let invalidWords = words.map(x => control.value.includes(x) ? x : null!).filter(x=>x != null);
      return invalidWords && invalidWords.length > 0 ? {'restrictedWords': invalidWords}: null!;
    };
  }

  saveSession(formValues: any): void {
    let session: ISession = {
      id: 0,
      name: formValues.name,
      duration: +formValues.duration,
      level: formValues.level,
      presenter: formValues.presenter,
      abstract: formValues.abstract,
      voters: []
    }
    console.log(session);
  }

}
