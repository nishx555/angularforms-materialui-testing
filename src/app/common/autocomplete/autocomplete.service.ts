import { Observable, from } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  startWith,
} from "rxjs/operators";
import { createHttpObservable } from "../util";

export class AutoCompleteService {
  search(searchInput: Observable<string>): Observable<String[]> {
    return searchInput.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      startWith(""),
      switchMap((searchText: string) => this.callSearchTextAPI(searchText))
    );
  }

  callSearchTextAPI(searchText = ""): Observable<string[]> {
    return createHttpObservable(`/api/datasource?search=${searchText}`);
  }
}
