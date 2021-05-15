import { Component, NgZone, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ComService } from '../../services/com.service';

import { SignalrService } from '../../services/signalr.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [MessageService]
})
export class MainComponent implements OnInit {

  public showModal = false;
  public modalContent: string[] = [];

  constructor(
    private signalr: SignalrService,
    private messageService: MessageService,
    private comService: ComService
  ) { }

  ngOnInit(): void {
    this.signalr.connect(this.messageService);

    this.comService.processDataInvalid$.subscribe(result => {
      this.showModal = true;
      this.modalContent = result.validationMessages;
    });
  }
}
