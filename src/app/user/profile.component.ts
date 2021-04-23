import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  firstName!: FormControl;
  lastName!: FormControl;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.firstName = new FormControl(this.authService.currentUser.firstName, [Validators.required, Validators.pattern('[a-zA-Z].*')]); //pattern
    this.lastName = new FormControl(this.authService.currentUser.lastName, Validators.required);
    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
    })
  }

  saveProfile(formValues: any): void {
    if (this.profileForm.valid) {
      console.log(formValues);
      this.authService.updateCurrentUser(formValues.firstName, formValues.lastName);
      this.router.navigate(['events']);
    }

  }

  cancel(): void {
    this.router.navigate(['events']);
  }

  validateFirstName(): boolean{
    return this.profileForm.controls.firstName.valid || this.profileForm.controls.firstName.untouched
  }

  validateLastName(): boolean{
    return this.profileForm.controls.lastName.valid || this.profileForm.controls.lastName.untouched
  }

}
