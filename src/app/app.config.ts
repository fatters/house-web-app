import { ApplicationConfig } from '@angular/core';
import { InMemoryScrollingOptions, PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router';

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
      withPreloading(PreloadAllModules),
      withInMemoryScrolling(inMemoryScrollingOptions)
    ),
    provideHttpClient(withFetch()),
    provideClientHydration()
  ]
};
