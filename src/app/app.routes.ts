import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent)
  },
  {
    path: 'search',
    loadComponent: () => import('./pages/search/search.component').then((m) => m.SearchComponent)
  },
  {
    path: ':propertyType/:purchaseType/:county/:town',
    loadComponent: () => import('./pages/search/search.component').then((m) => m.SearchComponent)
  },  
  { // TODO: a 404 component
    path: '*',
    pathMatch: 'full',
    redirectTo: ''
  }
];

/**
 * .../residential/rent/louth/drogheda
 * .../commercial/buy/dublin-6/dartry
 * .../:propertyType/:purchaseType/:county/:town
 */