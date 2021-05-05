import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import * as signalR from "@microsoft/signalr";
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { ComService } from '../../services/com.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [MessageService]
})
export class MainComponent implements OnInit {

  constructor(
    private messageService: MessageService,
    private authService: AuthenticationService,
    private comService: ComService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('/hub', {
        accessTokenFactory: () => this.authService.userValue.jwtToken as string
      })
      .build();

    
    connection.on('processingDoneReceived', (message: string) => {
      this.changeDetector.detectChanges();
      this.messageService.add({ severity: 'success', summary: 'Processing done', detail: message });
      console.info("Process finished");
      this.comService.setReloadProjects();
    });
    
    connection.start().catch((error) => {
      console.error(`Can't establish connection to signalR hub: ${error}`);
    });
  }
}
