import { Component, OnInit, SimpleChanges } from "@angular/core";
import { HtmlTagDefinition } from "@angular/compiler";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { SectionDialogComponent } from "../section-dialog/section-dialog.component";
import { Section } from "../model/section";
declare var tinymce: any;

@Component({
  selector: "app-tinymce-editor",
  templateUrl: "./tinymce-editor.component.html",
  styleUrls: ["./tinymce-editor.component.css"],
})
export class TinymceEditorComponent implements OnInit {
  title = "angulartinymc";
  currentSection: Section = {
    title_1: "Title 1",
    body_1: "Body 1",
    title_2: "Title 2",
    body_2: "Body 2",
  };
  dataModel: string = "Title 1";
  sectionsArray: Observable<any[]>;
  constructor(private db: AngularFirestore, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.db
      .collection("sub-menus/BEsTrv5sPPFWdcQ4rue4/sections")
      // .valueChanges()
      .snapshotChanges()
      .subscribe((data) => console.log("data", data));

    this.sectionsArray = this.db
      .collection("sub-menus/BEsTrv5sPPFWdcQ4rue4/sections")
      .snapshotChanges()
      .pipe(
        map((sections) => {
          return sections.map((section) => {
            return {
              id: section.payload.doc.id,
              ...(section.payload.doc.data() as {}),
            };
          });
        })
      );

    this.sectionsArray.subscribe((data) => {
      console.log(data);
      this.currentSection = data[0];
      this.dataModel = this.currentSection.title_1;
    });
    // tinymce.init({
    //   selector: "#mymce1",
    //   inline: true,
    //   placeholder: "Type here...",
    //   skin: "oxide",
    // });
    // const emailHeaderConfig = {
    //   selector: ".tinymce-heading",
    //   menubar: false,
    //   inline: true,
    //   plugins: ["lists", "powerpaste", "autolink"],
    //   toolbar: "undo redo | bold italic underline",
    //   valid_elements: "strong,em,span[style],a[href]",
    //   valid_styles: {
    //     "*": "font-size,font-family,color,text-decoration,text-align",
    //   },
    //   powerpaste_word_import: "clean",
    //   powerpaste_html_import: "clean",
    //   content_css: "//www.tiny.cloud/css/codepen.min.css",
    // };
    // const emailBodyConfig = {
    //   selector: ".tinymce-body",
    //   menubar: false,
    //   inline: true,
    //   plugins: [
    //     "link",
    //     "lists",
    //     "powerpaste",
    //     "autolink",
    //     "tinymcespellchecker",
    //   ],
    //   toolbar: [
    //     "undo redo | bold italic underline | fontselect fontsizeselect",
    //     "forecolor backcolor | alignleft aligncenter alignright alignfull | numlist bullist outdent indent",
    //   ],
    //   valid_elements: "p[style],strong,em,span[style],a[href],ul,ol,li",
    //   valid_styles: {
    //     "*": "font-size,font-family,color,text-decoration,text-align",
    //   },
    //   powerpaste_word_import: "clean",
    //   powerpaste_html_import: "clean",
    //   content_css: "//www.tiny.cloud/css/codepen.min.css",
    // };
    // tinymce.init(emailHeaderConfig);
    // tinymce.init(emailBodyConfig);
    // console.log("1", tinymce, tinymce.get("uuid"));
  }

  handleEvent($event) {
    // console.log("$event", $event);
  }

  onSaveClick() {
    console.log(tinymce.get("uuid"));
    console.log("------------------");
    console.log(this.dataModel);
    this.db
      .doc(`sub-menus/BEsTrv5sPPFWdcQ4rue4/sections/${this.currentSection.id}`)
      .update({
        title_1: this.currentSection.title_1,
        body_1: this.currentSection.body_1,
        title_2: this.currentSection.title_2,
        body_2: this.currentSection.body_2,
      });
  }

  onOpenDialogClick() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      title_1: "title_1",
      body_1: "body_1",
      title_2: "title_2",
      body_2: "body_2",
    } as Section;

    this.dialog
      .open(SectionDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((val) => {
        console.log("val", val);
      });
  }
}
