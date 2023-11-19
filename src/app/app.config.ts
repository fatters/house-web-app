import { ApplicationConfig } from '@angular/core';
import { InMemoryScrollingOptions, PreloadAllModules, provideRouter, withComponentInputBinding, withInMemoryScrolling, withPreloading } from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { routes } from './app.routes';

const inMemoryScrollingOptions: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling(inMemoryScrollingOptions),
      withPreloading(PreloadAllModules)
    ),
    provideHttpClient(withFetch()),
    provideClientHydration()
  ]
};
