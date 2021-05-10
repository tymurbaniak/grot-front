import { NgZone } from "@angular/core";
import { MessageService } from "primeng/api";

export interface ISignalRService {
  connect(messageService: MessageService, ngZone: NgZone): void;
  processFinish(): void;
}