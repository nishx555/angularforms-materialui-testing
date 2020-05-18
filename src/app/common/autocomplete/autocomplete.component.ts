import { Component, OnInit, Input } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable, Subject } from "rxjs";
import { AutoCompleteService } from "./autocomplete.service";

@Component({
  selector: "app-autocomplete",
  templateUrl: "./autocomplete.component.html",
  styleUrls: ["./autocomplete.component.css"],
})
export class AutocompleteComponent implements OnInit {
  myControl = new FormControl();

  filteredOptions: Observable<String[]>;
  searchTerm$ = new Subject<string>();

  constructor(private autocompleteService: AutoCompleteService) {}

  ngOnInit() {
    this.filteredOptions = this.autocompleteService.search(this.searchTerm$);
  }

  displayFn(inputText: string): string {
    return inputText ? inputText : "";
  }
}
