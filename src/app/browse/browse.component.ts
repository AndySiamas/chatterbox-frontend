import { Component, OnInit, OnDestroy } from '@angular/core';
import Chatroom from '../shared/models/chatroom.model';
import { Router } from '@angular/router';
import { NetworkService } from '../network/network.service';
import { Socket } from 'ngx-socket-io';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit, OnDestroy {

  public chatrooms: Chatroom[] = [];

  public constructor(private router: Router,
                     private networkService: NetworkService,
                     private socket: Socket) {}

  public ngOnInit(): void {
    this.setDefaultChatrooms();
  }

  public ngOnDestroy(): void {
    this.setDefaultChatrooms();
  }

  private async setDefaultChatrooms(): Promise<void> {
    this.chatrooms = await this.networkService.getDefaultChatrooms().toPromise();
  }

  public onChatroomClick(chatroom: Chatroom): void {
    this.router.navigate(['rooms', chatroom.id]);
  }

}
