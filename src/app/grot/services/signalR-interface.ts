import { MessageService } from "primeng/api";

export interface ISignalRService {
  connect(messageService: MessageService): void;
  processFinish(): void;
}