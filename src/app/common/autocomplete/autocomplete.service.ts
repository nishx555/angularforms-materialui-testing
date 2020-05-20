import { Observable } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  startWith,
} from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

export interface listResponseDataObject {
  data: String[];
}

@Injectable({ providedIn: "root" })
export class AutoCompleteService {
  constructor(private http: HttpClient) {}

  search(searchInput: Observable<string>): Observable<listResponseDataObject> {
    return searchInput.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      startWith(""),
      switchMap((searchText: string) => this.callSearchTextAPI(searchText))
    );
  }

  callSearchTextAPI(searchText = ""): Observable<listResponseDataObject> {
    return this.http.get<listResponseDataObject>(
      `/api/datasource?search=${searchText}`
    );
  }
}
