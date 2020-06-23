import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BrowseComponent } from './browse/browse.component';
import { ChatroomComponent } from './chatroom/chatroom.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'browse', component: BrowseComponent },
  { path: 'rooms/:id', component: ChatroomComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
