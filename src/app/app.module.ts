import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { UserInfoComponent } from "./user-info/user-info.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";
import { UserComponent } from "./user/user.component";
import { DemoMaterialModule } from "./user/material-module";
import { LocalStorageService } from "./common/localStorage.service";
import { UserService } from "./user/user.service";

export const appRoutes: Routes = [
  { path: "", component: UserInfoComponent },
  { path: "add-user", component: UserComponent },
  { path: "edit-user/:id", component: UserComponent },
];
@NgModule({
  declarations: [AppComponent, UserInfoComponent, UserComponent],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [LocalStorageService, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
