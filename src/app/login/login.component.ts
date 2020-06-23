import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormControl, NgModel } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('form', { static: false })
  public form: NgForm;

  public minUsernameChars: number = 4;
  public maxUsernameChars: number = 20;

  constructor(private router: Router) {}

  public ngOnInit(): void {}

  public login(): void {
    if (this.form.valid) {
      this.router.navigate(['browse']);
    }
  }

  public getErrorMessage(username: NgModel): string {
    if (username.value.length < this.minUsernameChars) {
      return `Username cannot be shorter than ${this.minUsernameChars} characters.`;
    } else {
      return 'Invalid username.';
    }
  }

}
