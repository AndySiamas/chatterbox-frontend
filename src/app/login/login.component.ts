import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormControl, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

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

  constructor(private router: Router,
              private authService: AuthService) {}

  public ngOnInit(): void {}

  public async login(username: NgModel): Promise<void> {
    if (this.form.invalid) return;
    this.authService.setNewUsername(username.value);
    if (!this.authService.hasUserToken()) {
      await this.authService.setUserTokenFromServer();
    }
    this.router.navigate(['browse']);
  }

  public getErrorMessage(username: NgModel): string {
    if (username.value.length < this.minUsernameChars) {
      return `Username cannot be shorter than ${this.minUsernameChars} characters.`;
    } else {
      return 'Invalid username.';
    }
  }

}
