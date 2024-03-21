import { Injectable } from '@angular/core';
import { Notification } from '../interfaces/notification';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifications: Notification[] = [];

  getNotifications(): Notification[] {
    return this.notifications;
  }

  addNotification(notification: Notification) {
    this.notifications.push(notification);
  }

  removeNotification(notification: Notification) {
    const notificationIndex = this.notifications.findIndex(
      (n) => n === notification
    );
    if (notificationIndex !== -1) {
      this.notifications.splice(notificationIndex, 1);
    } else {
      console.warn('Notification to remove not found');
    }
  }
}
