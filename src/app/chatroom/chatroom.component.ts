import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
export class ChatroomComponent implements OnInit {

  public id: string;
  private paramsSub: Subscription;
  public users: User[] = [];
  public messages: Message[] = [];

  @ViewChild('userinput')
  public userInput: ElementRef;

  public constructor(private route: ActivatedRoute,
                     private chatService: ChatroomService) {}

  public ngOnInit(): void {
    this.subscribeToParams();
  }

  private subscribeToParams(): void {
    this.paramsSub = this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
  }

  public onSendMessage(): void {
    console.log(this.userInput.nativeElement.value);
  }

}
