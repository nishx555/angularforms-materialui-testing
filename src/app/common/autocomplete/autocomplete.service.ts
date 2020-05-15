import { Observable } from "rxjs";
import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  startWith,
  toArray,
} from "rxjs/operators";

export interface State {
  name: string;
}

export class AutoCompleteService {
  options: String[];

  datasource: State[] = [
    { name: "Andhra Pradesh" },
    { name: "Arunachal Pradesh" },
    { name: "Assam" },
    { name: "Bihar" },
    { name: "Chhattisgarh" },
    { name: "Goa" },
    { name: "Gujarat" },
    { name: "Haryana" },
    { name: "Himachal Pradesh" },
    { name: "Jammu and Kashmir" },
    { name: "Jharkhand" },
    { name: "Karnataka" },
    { name: "Kerala" },
    { name: "Madhya Pradesh" },
    { name: "Maharashtra" },
    { name: "Manipur" },
    { name: "Meghalaya" },
    { name: "Mizoram" },
    { name: "Nagaland" },
    { name: "Odisha" },
    { name: "Punjab" },
    { name: "Rajasthan" },
    { name: "Sikkim" },
    { name: "Tamil Nadu" },
    { name: "Telangana" },
    { name: "Tripura" },
    { name: "Uttarakhand" },
    { name: "Uttar Pradesh" },
    { name: "West Bengal" },
    { name: "Andaman and Nicobar Islands" },
    { name: "Chandigarh" },
    { name: "Dadra and Nagar Haveli" },
    { name: "Daman and Diu" },
    { name: "Delhi" },
    { name: "Lakshadweep" },
    { name: "Puducherry" },
  ];

  constructor() {
    this.options = <String[]>this.datasource.map((state) => state.name);
  }

  getDataSource() {
    //For initial demo purpose, added a States object array and returns String array for common Observables
    return this.options;
  }

  search(searchInput: Observable<string>): Observable<String[]> {
    return searchInput.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      startWith(""),
      map((value: any) => (typeof value === "string" ? value : value.name)),
      map((searchText: string) =>
        searchText ? this._filter(searchText) : this.options.slice()
      )
    );
  }

  private _filter(inputTextOption: string): String[] {
    const filterValue = inputTextOption.toLowerCase();

    return this.options.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
