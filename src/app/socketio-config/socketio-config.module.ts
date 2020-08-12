import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../../environments/environment';

const config: SocketIoConfig = { url: environment.socketServerHost, options: {} };

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SocketIoModule.forRoot(config)
  ],
  exports: [SocketIoModule]
})
export class SocketIoConfigurationModule {}