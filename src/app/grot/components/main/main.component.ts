import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { SignalrService } from '../../services/signalr.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [MessageService]
})
export class MainComponent implements OnInit {

  constructor(
    private signalr: SignalrService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.signalr.connect(this.messageService);
  }
}
