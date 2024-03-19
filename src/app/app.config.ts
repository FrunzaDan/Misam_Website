import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { FilterPipe } from './shared/filter.pipe';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    FilterPipe,
    importProvidersFrom([
      BrowserModule,
      BrowserAnimationsModule,
      NoopAnimationsModule,
    ]),
  ],
};
