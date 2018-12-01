import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _count = 0;
  private _subject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() {}

  get loading(): Observable<boolean> {
    return this._subject.asObservable();
  }

  start(): void {
    ++this._count;
    this._subject.next(true);
  }

  stop(force: boolean = false): void {
    --this._count;
    if (force || this._count === 0) {
      this._count = 0;
      this._subject.next(false);
    }
  }
}
