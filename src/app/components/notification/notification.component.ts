import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../interfaces/notification';
import { BrowserModule } from '@angular/platform-browser';
import {
  animate,
  animation,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [FormsModule, CommonModule],
  animations: [
    trigger('notificationFadeOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s ease-in-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('0.3s ease-in-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent implements OnInit, OnDestroy {
  @Input()
  notification!: Notification;
  activeNotification = true;
  private timeoutId: ReturnType<typeof setTimeout> | null = null;
  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.startTimeout();
  }

  ngOnDestroy() {
    this.activeNotification = false;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  private startTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId as unknown as number | undefined);
    }
    this.timeoutId = setTimeout(() => this.dismissNotification(), 2000);
  }

  dismissNotification() {
    this.activeNotification = false;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
      this.notificationService.removeNotification(this.notification);
    }
  }
}
