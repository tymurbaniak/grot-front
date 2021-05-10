import { Injectable, NgZone } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ComService } from './com.service';
import { ISignalRService } from './signalR-interface';

@Injectable()
export class MockSignalrService implements ISignalRService {

  private endProcessSource = new Subject();

  endProcess$ = this.endProcessSource.asObservable();

  constructor(
    private comService: ComService
  ) { }

  public connect(messageService: MessageService, ngZone: NgZone): void {
    this.endProcess$
      .pipe(delay(10000))
      .subscribe(() => {
      console.info("Process finished");
      this.comService.removeProcessedProject();
      this.comService.setReloadProjects();
    })
  }

  public processFinish(): void {
    this.endProcessSource.next(true);
  }
}
