import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { Subscription, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoomGuardService {

  public onJoinRoomAuthorized: Observable<string> = this.socket.fromEvent<string>('joinRoomAuthorized');

  public constructor(private authService: AuthService,
                     private router: Router,
                     private socket: Socket) {}

  public async canActivate(route: ActivatedRouteSnapshot, 
                           state: RouterStateSnapshot): Promise<boolean> {
    let wantedRoomId: string = route.params['id'];
    this.socket.emit('requestJoinRoom', wantedRoomId);
    let validatedRoomId: string = await this.onJoinRoomAuthorized.pipe(take(1)).toPromise();
    return wantedRoomId === validatedRoomId;
  }
}
