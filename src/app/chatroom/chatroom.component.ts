import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import User from '../shared/models/user.model';
import Message from '../shared/models/message.model';
import { ChatroomService } from './chatroom.service';
import { AuthService } from '../auth/auth.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit, OnDestroy {

  public roomId: string;
  public users: User[] = [];
  public messages: Message[] = [];

  private paramsSub: Subscription;
  private messagesSub: Subscription;

  @ViewChild('userinput')
  public userInput: ElementRef;

  public constructor(private route: ActivatedRoute,
                     private chatService: ChatroomService,
                     private authService: AuthService,
                     private socket: Socket) {}

  public ngOnInit(): void {
    this.subscribeToParams();
    this.subscribeToEvents();
  }

  public ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
    this.messagesSub.unsubscribe();
  }

  private subscribeToParams(): void {
    this.paramsSub = this.route.params.subscribe((params: Params) => {
      this.roomId = params['id'];
    });
  }

  private subscribeToEvents(): void {
    this.messagesSub = this.chatService.onNewMessage.subscribe((message: Message) => {
      this.addNewMessage(message);
    });
  }

  public addNewMessage(newMessage: Message): Message {
    this.messages.push(newMessage);
    return newMessage;
  }

  public onSendMessage(): void {
    let messageText = this.userInput.nativeElement.value;
    if (messageText === '') return;
    let newMessage: Message = new Message(messageText, new Date(), this.authService.getUsername(), this.roomId);
    this.socket.emit('sendMessage', newMessage)
    this.userInput.nativeElement.value = '';
  }
}
