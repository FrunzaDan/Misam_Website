import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../interfaces/notification';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent implements OnInit, OnDestroy {
  @Input()
  notification!: Notification;
  private timeoutId: ReturnType<typeof setTimeout> | null = null;
  isVisible = true;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.startTimeout();
  }

  ngOnDestroy() {
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
    this.isVisible = false;
    setTimeout(() => {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
        this.notificationService.removeNotification(this.notification);
      }
    }, 300);
  }
}
