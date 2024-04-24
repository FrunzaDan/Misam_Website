import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { getAnalytics, provideAnalytics } from '@angular/fire/analytics';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import {
  provideRouter,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { FilterPipe } from './shared/filter.pipe';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      }),
      withViewTransitions()
    ),

    provideClientHydration(),
    provideHttpClient(withFetch()),
    FilterPipe,
    importProvidersFrom([
      BrowserModule,
      BrowserAnimationsModule,
      NoopAnimationsModule,
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      provideAnalytics(() => getAnalytics()),
    ]),
  ],
};
