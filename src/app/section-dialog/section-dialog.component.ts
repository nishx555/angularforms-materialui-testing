import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Section } from "../model/section";

@Component({
  selector: "section-dialog",
  templateUrl: "./section-dialog.component.html",
  styleUrls: ["./section-dialog.component.css"],
})
export class SectionDialogComponent implements OnInit {
  form: FormGroup;
  description: string;
  section: Section;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) section: Section
  ) {
    // this.course = course;
    // const titles = course.titles;

    this.form = fb.group({
      description: [section.title_1, Validators.required],
      longDescription: [section.body_1, Validators.required],
    });
  }

  ngOnInit() {}

  save() {
    //Get the modified values from the form
    const changes = this.form.value;
    console.log("save clicked");
    this.dialogRef.close(this.form.value);
    // this.coursesService
    //   .saveCourse(this.course.id, { titles: changes })
    //   .subscribe(() => this.dialogRef.close(this.form.value));
  }

  close() {
    console.log("close clicked");
    this.dialogRef.close();
  }
}
