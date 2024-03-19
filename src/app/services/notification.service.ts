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
    const updatedNotifications = this.notifications
      .getValue()
      .filter((n) => n !== notification);
    this.notifications.next(updatedNotifications);
  }
}
