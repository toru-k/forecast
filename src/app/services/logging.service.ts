import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  constructor() {}

  log(message: any): void {
    console.log(message);
  }
}
