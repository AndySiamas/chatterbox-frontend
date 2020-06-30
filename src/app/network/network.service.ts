import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Token } from '../shared/models/token.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import Chatroom from '../shared/models/chatroom.model';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  public messages: Observable<string> = this.socket.fromEvent<string>('messages');

  constructor(private socket: Socket,
              private http: HttpClient) {}

  public requestUserToken(username: string): Observable<Token> {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('username', username);
    return this.http.get<Token>(env.mainServerHost + env.requestTokenEndpoint, {
      params: searchParams
    });
  }

  public requestIfTokenIsValid(userToken: string): Observable<boolean> {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('token', userToken);
    return this.http.get<boolean>(env.mainServerHost + env.requestValidationForTokenEndpoint, {
      params: searchParams
    });
  }

  public getDefaultChatrooms(): Observable<Chatroom[]> {
    return this.http.get<Chatroom[]>(env.mainServerHost + env.defaultRoomsEndpoint);
  }
}
