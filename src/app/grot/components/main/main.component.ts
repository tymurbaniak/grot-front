import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import * as signalR from "@microsoft/signalr";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('/hub')
      .build();
    
    connection.on('processingDoneReceived', (message: string) => {      
      this.messageService.add({ severity: 'success', summary: 'Processing done', detail: message});
    });
  }

}
