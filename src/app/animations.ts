import { animate, style, transition, trigger } from '@angular/animations';

export const fadeIn = trigger('transformIn', [
  transition(':enter', [
    style({
      opacity: 0,
    }),
    animate('400ms ease-in', style({ opacity: 1 })),
  ]),
]);
export const fadeOut = trigger('transformOut', [
  transition(':leave', [
    style({
      opacity: 1,
    }),
    animate('600ms ease-out', style({ opacity: 0 })),
  ]),
]);
