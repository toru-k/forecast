import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy {
  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messageService.open();
  }

  ngOnDestroy() {
    this.messageService.close();
  }
}
