import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { ComService } from './com.service';
import { ISignalRService } from './signalR-interface';

@Injectable()
export class SignalrService implements ISignalRService {  

  constructor(    
    private authService: AuthenticationService,
    private comService: ComService
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
      messageService.add({ severity: 'success', summary: 'Processing done', detail: message });
      console.info("Process finished");
      this.comService.removeProcessedProject();
      this.comService.setReloadProjects();
    });

    connection.start().catch((error) => {
      console.error(`Can't establish connection to signalR hub: ${error}`);
    });
  }
}
