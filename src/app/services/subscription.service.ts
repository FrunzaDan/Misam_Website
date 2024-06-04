import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  constructor() {}

  public unsubscribeIfActive(
    subscription: Subscription | null | undefined
  ): void {
    if (subscription && !subscription.closed) {
      subscription.unsubscribe();
    }
  }
}
