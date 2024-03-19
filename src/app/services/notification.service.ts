import { Injectable } from '@angular/core';
import { Notification } from '../interfaces/notification';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifications = new BehaviorSubject<Notification[]>([]);
  currentNotifications = this.notifications.asObservable();

  addNotification(notification: Notification) {
    this.notifications.next([...this.notifications.getValue(), notification]);
  }

  removeNotification(notification: Notification) {
    const currentNotifications = this.notifications.getValue();
    const notificationIndex = currentNotifications.findIndex(
      (n) => n === notification
    );
    if (notificationIndex !== -1) {
      const updatedNotifications = [
        ...currentNotifications.slice(0, notificationIndex),
        ...currentNotifications.slice(notificationIndex + 1),
      ];
      this.notifications.next(updatedNotifications);
    } else {
      console.warn('Notification to remove not found');
    }
  }
}
