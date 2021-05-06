import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName!: string;
  password!:string;
  mouseOverLogin: boolean = false;
  loginIvalid: boolean = false;
  constructor(private authService:AuthService, private router: Router) {

  }

  ngOnInit(): void {
  }

  login(formValues: any): void {
    //console.log(formValues.form.value);
    if (formValues.valid) {
      this.authService.loginUser(formValues.value.userName, formValues.value.password)
        .subscribe({
          next: resp=> {
            if (!resp) {
              this.loginIvalid = true;
            } else {
              this.router.navigate(['events']);
            }
          }
        });

    }

  }

  cancel(): void {
    this.router.navigate(['events']);
  }
}
