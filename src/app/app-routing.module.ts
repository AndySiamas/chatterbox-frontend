import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BrowseComponent } from './browse/browse.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { AuthGuardService } from './auth/auth.guard';
import { RoomGuardService } from './auth/room-guard.service';


const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { formType: 'login' } },
  { path: 'signup', component: LoginComponent, data: { formType: 'signup' } },
  { path: 'browse', component: BrowseComponent, canActivate: [AuthGuardService] },
  { path: 'rooms/:id', component: ChatroomComponent, canActivate: [AuthGuardService, RoomGuardService] },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
