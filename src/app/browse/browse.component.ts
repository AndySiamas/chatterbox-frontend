import { Component, OnInit } from '@angular/core';
import Chatroom from '../shared/models/chatroom.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {

  public chatrooms: Chatroom[] = [ { name: 'General' }, 
                                   { name: 'Health' }, 
                                   { name: 'Beauty' }, 
                                   { name: 'Sports' },
                                   { name: 'Technology' },
                                   { name: 'Dating' } ];

  public constructor(private router: Router) {}

  public ngOnInit(): void {}

  public onChatroomClick(chatroom: Chatroom): void {
    console.log(`${chatroom.name} room clicked!`);
  }

}
