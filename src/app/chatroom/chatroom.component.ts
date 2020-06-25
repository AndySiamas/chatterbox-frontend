import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import User from '../shared/models/user.model';
import Message from '../shared/models/message.model';
import { ChatroomService } from './chatroom.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit, OnDestroy {

  public id: string;
  public users: User[] = [];

  private paramsSub: Subscription;
  private messagesSub: Subscription;

  @ViewChild('userinput')
  public userInput: ElementRef;

  public constructor(private route: ActivatedRoute,
                     private chatService: ChatroomService) {}

  public ngOnInit(): void {
    this.subscribeToParams();
    this.subscribeToMessages();
  }

  public ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
    this.messagesSub.unsubscribe();
  }

  private subscribeToParams(): void {
    this.paramsSub = this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
  }

  private subscribeToMessages(): void {
    this.messagesSub = this.chatService.messages.subscribe((message: string) => {
      console.log(message);
    });
  }

  public onSendMessage(): void {
    console.log(this.userInput.nativeElement.value);
  }

}
