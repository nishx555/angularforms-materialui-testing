import { Component, OnInit, Input, Inject } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Subject } from "rxjs";
import { AutoCompleteService } from "./autocomplete.service";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";

@Component({
  selector: "app-autocomplete",
  templateUrl: "./autocomplete.component.html",
  styleUrls: ["./autocomplete.component.css"],
})
export class AutocompleteComponent implements OnInit {
  myControl = new FormControl();
  errorMessage = null;

  // filteredOptions: Observable<String[]>;
  filteredOptions: String[];
  searchTerm$ = new Subject<string>();

  constructor(
    private autocompleteService: AutoCompleteService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.autocompleteService.search(this.searchTerm$).subscribe(
      (responseData) => {
        this.filteredOptions = responseData.data;
      },
      (error) => {
        this.dialog.open(AutocompleteErrorDialog, {
          data: {
            errorMessage: error.message,
          },
        });
      }
    );
  }

  displayFn(inputText: string): string {
    return inputText ? inputText : "";
  }
}

@Component({
  selector: "autocomplete-error-dialog",
  templateUrl: "autocomplete-error-dialog.html",
})
export class AutocompleteErrorDialog {
  constructor(
    private dialogRef: MatDialogRef<AutocompleteErrorDialog>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      errorMessage: string;
    }
  ) {}
  close(): void {
    this.dialogRef.close();
  }
}
