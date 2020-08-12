import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router, ActivatedRoute, UrlSegment, UrlSegmentGroup } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm', { static: false })
  public loginForm: NgForm;

  @ViewChild('signupForm', { static: false })
  public signupForm: NgForm;

  @ViewChild('username', { static: false })
  public usernameControl: NgModel;

  public minUsernameChars: number = 4;
  public maxUsernameChars: number = 20;

  public formType: 'login' | 'signup' = 'login';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {}

  public ngOnInit(): void {
    this.subscribeToFormType();
  }

  private subscribeToFormType(): void {
    this.route.data.subscribe((data: { formType: 'login' | 'signup' }) => {
      this.formType = data.formType;
    });
  }

  public async login(username: NgModel, password: NgModel): Promise<void> {
    if (this.loginForm.invalid) {
      return;
    }

    let isAuthenticated: boolean = await this.authService.login(username.value, password.value);
    if (isAuthenticated) {
      this.router.navigate(['browse']);
    }
  }

  public async signup(username: NgModel, email: NgModel, password: NgModel, confirmedPassword: NgModel) {
    if (password.value !== confirmedPassword.value) {
      console.error('Passwords are not identical.');
      return;
    }

    if (this.signupForm.valid) {
      this.authService.signup(username.value, password.value, email.value);
      return;
    }
  }
}
