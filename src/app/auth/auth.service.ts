import { Injectable } from '@angular/core';
import { Token } from '../shared/models/token.model';
import { NetworkService } from '../network/network.service';
import { take } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private username: string = null;
  private userToken: Token = null;
  private currentRoom: string = null;

  public constructor(private networkService: NetworkService,
                     private socket: Socket) {}

  public hasUsername(): boolean {
    return this.username !== null;
  }

  public getUsername(): string {
    return this.username;
  }

  public setNewUsername(username: string): void {
    this.username = username;
    sessionStorage.setItem('username', username);
  } 

  public setUsernameFromSession(): void {
    let username: string = sessionStorage.getItem('username');
    if (username !== null) {
      this.username = username;
    }
  }

  public hasUserToken(): boolean {
    return this.userToken !== null;
  }

  public async setUserTokenFromSession(): Promise<boolean> {
    let userTokenFromSession = await this.getUserTokenFromSession();
    if (userTokenFromSession !== null) {
      this.userToken = userTokenFromSession;
      sessionStorage.setItem('token', userTokenFromSession.value);
    }
    return userTokenFromSession === null;
  }

  public async getUserTokenFromSession(): Promise<Token> {
    let tokenValueFromSession: string = sessionStorage.getItem('token');
    if (tokenValueFromSession !== null) {
      let isTokenValid: boolean = await this.networkService.requestIfTokenIsValid(tokenValueFromSession).toPromise();
      if (isTokenValid) {
        return new Token(tokenValueFromSession);
      }
    }
    return null;
  }

  public async setUserTokenFromServer(): Promise<boolean> {
    let userTokenFromServer = await this.getUserTokenFromServer();
    if (userTokenFromServer !== null) {
      this.userToken = userTokenFromServer;
      sessionStorage.setItem('token', userTokenFromServer.value);
    }
    return userTokenFromServer === null;
  }

  public async getUserTokenFromServer(): Promise<Token> {
    let userToken = await this.networkService.requestUserToken(this.username).toPromise();
    return userToken;
  }

  public async isAuthenticated(): Promise<boolean> {
    await this.setUsernameFromSession();
    await this.setUserTokenFromSession();
    return this.hasUserToken() && this.hasUsername();
  }

  public async isAllowedToJoinRoom(roomId: string): Promise<boolean> {
    return true;
  }

  public emitAuthorizedEvent(): void {
    this.socket.emit('authorized', { username: this.username, token: this.userToken.value }, () => {
      console.log('User is authorized!');
    });
  }
}
