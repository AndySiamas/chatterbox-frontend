import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public title: string = 'ChatterBox';

  public constructor(private authService: AuthService) {}

  public ngOnInit(): void {
    this.authService.setUsernameAndTokenFromCookies();
  }
}
