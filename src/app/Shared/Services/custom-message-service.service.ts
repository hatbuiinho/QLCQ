import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class CustomMessageServiceService {
  constructor(private messageService: MessageService) {}
  warn = (message: string, summary: string = '') => {
    this.messageService.add({
      detail: message,
      severity: 'warn',
      summary,
    });
  };
  error = (message: string, summary: string = '') => {
    this.messageService.add({
      detail: message,
      severity: 'error',
      summary,
    });
  };
  success = (message: string, summary: string = '') => {
    this.messageService.add({
      detail: message,
      severity: 'success',
      summary,
    });
  };
  info = (message: string, summary: string = '') => {
    this.messageService.add({
      detail: message,
      severity: 'info',
      summary,
    });
  };
}
