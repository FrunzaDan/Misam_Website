import {
  animation,
  style,
  animate,
  trigger,
  transition,
  useAnimation,
} from '@angular/animations';

export const enterFade = transition(':enter', [
  style({
    opacity: 0,
  }),
  animate('300ms ease-in', style({ opacity: 1 })),
]);
export const exitFade = transition(':leave', [
  style({
    opacity: 1,
  }),
  animate('300ms ease-out', style({ opacity: 0 })),
]);
