import { Injectable } from '@angular/core';
import { Notification } from '../interfaces/notification';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationsArray: Notification[] = [];

  getNotifications(): Notification[] {
    return this.notificationsArray;
  }

  addNotification(notification: Notification) {
    this.notificationsArray.push(notification);
  }

  removeNotification(notification: Notification) {
    const notificationIndex = this.notificationsArray.findIndex(
      (n) => n === notification
    );
    if (notificationIndex !== -1) {
      this.notificationsArray.splice(notificationIndex, 1);
    } else {
      console.warn('Notification to remove not found');
    }
  }
}
