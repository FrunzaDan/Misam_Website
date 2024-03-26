import { Injectable } from '@angular/core';
import { Notification } from '../interfaces/notification';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);

  get notifications$(): BehaviorSubject<Notification[]> {
    return this.notificationsSubject;
  }

  addNotification(notification: Notification) {
    const currentNotifications = this.notificationsSubject.getValue();
    this.notificationsSubject.next([...currentNotifications, notification]);
  }

  removeNotification(notification: Notification) {
    const index = this.notificationsSubject
      .getValue()
      .findIndex((n) => n === notification);
    if (index !== -1) {
      this.notificationsSubject.next([
        ...this.notificationsSubject.getValue().slice(0, index),
        ...this.notificationsSubject.getValue().slice(index + 1),
      ]);
    }
  }
}
