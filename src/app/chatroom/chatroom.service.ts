import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {

  public testEvent: Observable<string> = this.socket.fromEvent<string>('testEvent');
  
  public constructor(private socket: Socket) {}

  public getSocketInfo() {
  }
}