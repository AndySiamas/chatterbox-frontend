import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {

  public messages: Observable<string> = this.socket.fromEvent<string>('messages');
  
  public constructor(private socket: Socket) {}

  public getSocketInfo() {}
}