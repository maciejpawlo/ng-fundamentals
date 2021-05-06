import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from '../common/toastr.service';
import { Toastr, TOASTR_TOKEN } from '../common/toastr2.service';
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
  constructor(private authService: AuthService, private router: Router, @Inject(TOASTR_TOKEN) private toastr: Toastr) { }

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
      this.authService.updateCurrentUser(formValues.firstName, formValues.lastName)
        .subscribe({
          next: () => {
            this.toastr.success('Profile Saved');
          }
        });
      //this.router.navigate(['events']);
    }

  }

  logout() {
    this.authService.logout().subscribe(()=>{
      this.router.navigate(['/user/login']);
    })
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
