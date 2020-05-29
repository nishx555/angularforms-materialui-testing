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

export const appRoutes: Routes = [
  { path: "", component: UserInfoComponent },
  { path: "add-user", component: UserComponent },
  { path: "edit-user/:id", component: UserComponent },
  { path: "autocomplete", component: AutocompleteComponent },
  { path: "d3-charts", component: D3ChartsComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    UserInfoComponent,
    UserComponent,
    AutocompleteComponent,
    D3ChartsComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
  ],
  providers: [LocalStorageService, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
