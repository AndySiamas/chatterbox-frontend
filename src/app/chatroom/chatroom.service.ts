import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import Message from '../shared/models/message.model';
import User from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {

  public onNewMessage: Observable<Message> = this.socket.fromEvent<Message>('message');
  
  public constructor(private socket: Socket) {}

  
}