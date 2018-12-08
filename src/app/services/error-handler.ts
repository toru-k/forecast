import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { LoggingService } from './logging.service';
import { MessageService } from './message.service';

@Injectable()
export class ForecastErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error) {
    const loggingService: LoggingService = this.injector.get(LoggingService);
    const messageService: MessageService = this.injector.get(MessageService);
    const location: LocationStrategy = this.injector.get(LocationStrategy);
    const message = error.message ? error.message : error.toString();
    const url = location instanceof PathLocationStrategy ? location.path() : '';
    loggingService.log({ message: message, url: url });
    messageService.setMessage(message);
  }
}
