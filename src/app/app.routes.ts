import { Routes } from '@angular/router';
import { searchResolver } from './resolvers/search.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent)
  },
  {
    path: 'search',
    loadComponent: () => import('./pages/search/search.component').then((m) => m.SearchComponent),
    resolve: { items: searchResolver },
    runGuardsAndResolvers: 'pathParamsOrQueryParamsChange'
  },
  {
    path: ':purchaseType/:advertType', // TODO dont path the first bit
    loadComponent: () => import('./pages/search/search.component').then((m) => m.SearchComponent),
    resolve: { items: searchResolver },
    runGuardsAndResolvers: 'pathParamsOrQueryParamsChange'
  },
  {
    path: ':purchaseType/:advertType/:county',
    loadComponent: () => import('./pages/search/search.component').then((m) => m.SearchComponent),
    resolve: { items: searchResolver },
    runGuardsAndResolvers: 'pathParamsOrQueryParamsChange'
  },
  {
    path: ':purchaseType/:advertType/:county/:town',
    loadComponent: () => import('./pages/search/search.component').then((m) => m.SearchComponent),
    resolve: { items: searchResolver },
    runGuardsAndResolvers: 'pathParamsOrQueryParamsChange'
  },
  {
    path: ':purchaseType/:advertType/:county/:town/advert/:id',
    loadComponent: () => import('./pages/advert/advert.component').then((m) => m.AdvertComponent),
    resolve: { items: searchResolver },
    runGuardsAndResolvers: 'pathParamsOrQueryParamsChange'
  },
  ////////////////////////////////////////////////////////////////////
  {
    path: 'privacy-policy',
    loadComponent: () => import('./pages/privacy-policy/privacy-policy.component').then((m) => m.PrivacyPolicyComponent) 
  },
  { // TODO: a 404 component THIS CURRENTLY DONT WORK
    path: '*',
    pathMatch: 'full',
    redirectTo: '/'
  }
];

/**
 * ON FILTER CHANGE -> Search w/ query params
 * /rent | all ireland rent
 * /buy/commercial | all ireland commercial buy
 * /buy/louth | all louth buy
 * /rent/commercial/wexford | all wexford rent commercial
 * /buy/residential/drogheda
 */

// OLD
/**
 * .../residential/rent/louth/drogheda
 * .../commercial/buy/dublin-6/dartry
 * .../:propertyType/:purchaseType/:county/:town
 */