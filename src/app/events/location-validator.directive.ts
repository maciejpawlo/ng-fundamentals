import { Directive } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, Validator, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[validateLocation]',
  providers: [{provide: NG_VALIDATORS, useExisting: LocationValidatorDirective, multi: true}]
})//multi = true --> dodajemy do listy istniejacych serwisow
export class LocationValidatorDirective implements Validator {

  constructor() { }
  validate(control: FormGroup): ValidationErrors | null {
    let adressControl = control.controls['address'];
    let cityControl = control.controls['city'];
    let countryControl = control.controls['country'];
    let onlineUrlControl = (<FormGroup>control.root).controls['onlineUrl'];

    if ((adressControl && adressControl.value && cityControl && cityControl.value && countryControl && countryControl.value)
    || (onlineUrlControl && onlineUrlControl.value)) {
      return null; //jest ok
    } else {
      return {validaLocaton: false};
    }
  }

}
