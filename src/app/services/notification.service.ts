import { Injectable } from '@angular/core';
import { Notification } from '../interfaces/notification';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private maxNotifications: number = 1;
  private notificationsSubject: BehaviorSubject<Notification[]> =
    new BehaviorSubject<Notification[]>([]);

  get notifications$(): BehaviorSubject<Notification[]> {
    return this.notificationsSubject;
  }

  addNotification(notification: Notification): void {
    const currentNotifications: Notification[] = this.notificationsSubject
      .getValue()
      .slice(0, this.maxNotifications - 1);
    this.notificationsSubject.next([...currentNotifications, notification]);
  }

  removeNotification(notification: Notification): void {
    const index: number = this.notificationsSubject
      .getValue()
      .findIndex((n: Notification): boolean => n === notification);
    if (index !== -1) {
      this.notificationsSubject.next([
        ...this.notificationsSubject.getValue().slice(0, index),
        ...this.notificationsSubject.getValue().slice(index + 1),
      ]);
    }
  }
}
