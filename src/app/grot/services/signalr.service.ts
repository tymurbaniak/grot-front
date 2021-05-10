import { Injectable, NgZone } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { MessageService } from 'primeng/api';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { ComService } from './com.service';
import { ISignalRService } from './signalR-interface';

@Injectable()
export class SignalrService implements ISignalRService {

  constructor(
    private authService: AuthenticationService,
    private comService: ComService,
    private ngZone: NgZone    
  ) { }

  processFinish(): void {

  }

  public connect(messageService: MessageService): void {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('/hub', {
        accessTokenFactory: () => this.authService.userValue.jwtToken as string
      })
      .build();

    connection.on('processingDoneReceived', (message: string) => {
      console.log('processingDoneReceived called');
      console.log(`Is in angular zone: ${NgZone.isInAngularZone()}`);
      this.ngZone.run(() => {
        console.log(`Is in angular zone: ${NgZone.isInAngularZone()}`);
        console.info("Process finished");
        messageService.add({ severity: 'success', summary: 'Processing done', detail: message });
        this.comService.removeProcessedProject();
        this.comService.setReloadProjects();
      });      
    });

    connection.start().catch((error) => {
      console.error(`Can't establish connection to signalR hub: ${error}`);
    });
  }
}
