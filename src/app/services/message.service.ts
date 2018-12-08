import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private message: Message = new Message();
  private messageSubject = new Subject<Message>();
  private messageState = this.messageSubject.asObservable();

  constructor(public snackBar: MatSnackBar, private zone: NgZone) {}

  setMessage(message: string): void {
    this.message.message = message;
    this.messageSubject.next(this.message);
  }

  open(): void {
    this.messageState.subscribe((message: Message) => {
      // ExpressionChangedAfterItHasBeenCheckedError の回避で非同期にしています。
      setTimeout(() => {
        if (message.message !== '') {
          // MatSnackBarの表示位置と自動で閉じない事象の対応。
          this.zone.run(() => {
            this.snackBar.open(message.message, 'close', {
              duration: 2000,
              verticalPosition: 'top'
            });
          });
        }
      });
    });
  }

  close(): void {
    this.messageSubject.unsubscribe();
  }
}
