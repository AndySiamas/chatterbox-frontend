import { Component, OnInit } from '@angular/core';
import Chatroom from '../shared/models/chatroom.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {

  public chatrooms: Chatroom[] = [ { name: 'General', id: 'general' }, 
                                   { name: 'Health', id: 'health' }, 
                                   { name: 'Beauty', id: 'beauty' }, 
                                   { name: 'Sports', id: 'sports' },
                                   { name: 'Technology', id: 'technology' },
                                   { name: 'Dating', id: 'dating' } ];

  public constructor(private router: Router) {}

  public ngOnInit(): void {}

  public onChatroomClick(chatroom: Chatroom): void {
    this.router.navigate(['rooms', chatroom.id]);
  }

}
