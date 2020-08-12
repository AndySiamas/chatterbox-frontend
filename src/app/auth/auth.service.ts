import { Injectable } from '@angular/core';
import { Token } from '../shared/models/token.model';
import { NetworkService } from '../network/network.service';
import { Socket } from 'ngx-socket-io';
import ChatterboxResponse from '../../../../project-shared/models/chatterbox-response.model';
import { CookieService } from 'ngx-cookie-service';
import ChatterboxError from '../../../../project-shared/models/chatterbox-error.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private username: string = null;
  private token: string = null;
  private currentRoom: string = null;

  public constructor(private networkService: NetworkService,
                     private cookieService: CookieService,
                     private socket: Socket) {}

  public setUsernameAndTokenFromCookies(): void {
    this.setUsernameFromCookies();
    this.setUserTokenFromCookies();
  }

  public async login(username: string, password: string): Promise<boolean> {
    let response: ChatterboxResponse = await this.networkService.requestLogin(username, password).toPromise();
    let token: string = response.data.token;
    if (response.isError || !token) {
      let error = <ChatterboxError>response;
      console.log(`Server response error: ${error.data.message}`)
      return false;
    }

    this.setUsername(username);
    this.setToken(token);
    return true;
  }
  
  public async signup(username: string, password: string, email: string): Promise<boolean> {
    let response: ChatterboxResponse = await this.networkService.requestSignup(username, password, email).toPromise();
    let token: string = response.data.token;
    if (response.isError || !token) {
      let error = <ChatterboxError>response;
      console.log(`Server response error: ${error.data.message}`)
      return false;
    }

    this.setUsername(username);
    this.setToken(token);
    return true;
  }

  public hasUsername(): boolean {
    return this.username !== null;
  }

  public getUsername(): string {
    return this.username;
  }

  public setUsername(username: string): void {
    this.username = username;
    this.cookieService.set('username', username, 365);
  }

  public setToken(token: string): void {
    this.token = token;
    this.cookieService.set('token', token, 365);
  }

  public setUsernameFromCookies(): void {
    let username: string = this.cookieService.get('username');
    if (username) {
      this.username = username;
    }
  }

  public async hasValidUserToken(): Promise<boolean> {
    if (this.token === null) {
      return false;
    }

    let response: ChatterboxResponse = await this.networkService.requestIfTokenIsValid(this.username, this.token).toPromise();
    let result: boolean = response.data.result;

    if (response.isError || result === undefined) {
      let error = <ChatterboxError>response;
      console.log(`Server response error: ${error.data.message}`)
      return false;
    }

    return result;
  }

  public setUserTokenFromCookies(): void {
    let token: string = this.cookieService.get('token');
    if (token !== null) {
      this.token = token;
    }
  }

  public async isAuthenticated(): Promise<boolean> {
    let hasValidUserToken: boolean = await this.hasValidUserToken();
    return hasValidUserToken && this.hasUsername();
  }

  public async isAllowedToJoinRoom(roomId: string): Promise<boolean> {
    return true;
  }

  public emitAuthorizedEvent(): void {
    this.socket.emit('authorized', { username: this.username, token: this.token }, () => {
      console.log('User is authorized!');
    });
  }
}
