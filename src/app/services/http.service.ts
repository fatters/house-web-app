import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { SearchMock } from "../data/search.mock";
import { of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private http = inject(HttpClient);

  search(): any {
    return of(SearchMock);
  }
}