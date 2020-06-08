import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { UserInfoComponent } from "./user-info/user-info.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { UserComponent } from "./user/user.component";
import { DemoMaterialModule } from "./user/material-module";
import { LocalStorageService } from "./common/localStorage.service";
import { UserService } from "./user/user.service";
import { AutocompleteComponent } from "./common/autocomplete/autocomplete.component";
import { D3ChartsComponent } from "./d3-charts/d3-charts.component";
import { TinymceEditorComponent } from "./tinymce-editor/tinymce-editor.component";
import { EditorModule, TINYMCE_SCRIPT_SRC } from "@tinymce/tinymce-angular";
import { AngularFireModule } from "@angular/fire";

import { environment } from "../environments/environment";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { SectionDialogComponent } from "./section-dialog/section-dialog.component";

export const appRoutes: Routes = [
  { path: "", component: UserInfoComponent },
  { path: "add-user", component: UserComponent },
  { path: "edit-user/:id", component: UserComponent },
  { path: "autocomplete", component: AutocompleteComponent },
  { path: "d3-charts", component: D3ChartsComponent },
  { path: "editor", component: TinymceEditorComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    UserInfoComponent,
    UserComponent,
    AutocompleteComponent,
    D3ChartsComponent,
    TinymceEditorComponent,
    SectionDialogComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    EditorModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],
  providers: [
    LocalStorageService,
    UserService,
    // { provide: TINYMCE_SCRIPT_SRC, useValue: "tinymce/tinymce.min.js" },
  ],
  bootstrap: [AppComponent],
  entryComponents: [SectionDialogComponent],
})
export class AppModule {}
