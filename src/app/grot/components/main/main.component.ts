import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import * as signalR from "@microsoft/signalr";
import { AuthenticationService } from 'src/app/auth/services/authentication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [MessageService]
})
export class MainComponent implements OnInit {

  constructor(
    private messageService: MessageService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('/hub', {
        accessTokenFactory: () => this.authService.userValue.jwtToken as string
      })
      .build();

    
    connection.on('processingDoneReceived', (message: string) => {
      this.messageService.add({ severity: 'success', summary: 'Processing done', detail: message });
    });
    
    if(connection.state !== signalR.HubConnectionState.Disconnected){

    }
    
    connection.start().catch((error) => {
      console.error(`Can't establish connection to signalR hub: ${error}`);
    });
  }
}
