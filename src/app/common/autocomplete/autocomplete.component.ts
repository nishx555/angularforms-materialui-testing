import { Component, OnInit, Input } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { State } from "./autocomplete.service";

@Component({
  selector: "app-autocomplete",
  templateUrl: "./autocomplete.component.html",
  styleUrls: ["./autocomplete.component.css"],
})
export class AutocompleteComponent implements OnInit {
  myControl = new FormControl();

  @Input("datasource") options: String[];
  filteredOptions: Observable<String[]>;

  constructor() {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map((value) => (typeof value === "string" ? value : value.name)),
      map((name) => (name ? this._filter(name) : this.options.slice()))
    );
  }

  displayFn(inputText: string): string {
    return inputText ? inputText : "";
  }

  private _filter(inputTextOption: string): String[] {
    const filterValue = inputTextOption.toLowerCase();

    return this.options.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
