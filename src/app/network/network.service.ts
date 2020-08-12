import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Token } from '../shared/models/token.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import Chatroom from '../shared/models/chatroom.model';
import ChatterboxResponse from '../../../../project-shared/models/chatterbox-response.model';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  public messages: Observable<string> = this.socket.fromEvent<string>('messages');

  constructor(private socket: Socket,
              private http: HttpClient) {}

  public requestLogin(username: string, password: string): Observable<ChatterboxResponse> {
    return this.http.post<ChatterboxResponse>(env.mainServerHost + env.loginEndpoint, {
      username: username,
      password: password
    });
  }

  public requestSignup(username: string, password: string, email: string): Observable<ChatterboxResponse> {
    return this.http.post<ChatterboxResponse>(env.mainServerHost + env.signupEndpoint, {
      username: username,
      email: email,
      password: password
    });
  }

  public requestUserToken(username: string): Observable<Token> {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('username', username);
    return this.http.get<Token>(env.mainServerHost + env.requestTokenEndpoint, {
      params: searchParams
    });
  }

  public requestIfTokenIsValid(username: string, token: string): Observable<ChatterboxResponse> {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('username', username);
    searchParams = searchParams.append('token', token);
    return this.http.get<ChatterboxResponse>(env.mainServerHost + env.requestValidationForTokenEndpoint, {
      params: searchParams
    });
  }

  public getDefaultChatrooms(): Observable<Chatroom[]> {
    return this.http.get<Chatroom[]>(env.mainServerHost + env.defaultRoomsEndpoint);
  }
}
