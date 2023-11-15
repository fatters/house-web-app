import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { HttpService } from "../services/http.service";

export const searchResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> => {
  const service = inject(HttpService);

  console.log('SEARCH RESOLVER');

  const allParams = {
    ...route.params,
    ...route.queryParams
  };

  console.log('allParams', allParams);

  return service.search(allParams);
}