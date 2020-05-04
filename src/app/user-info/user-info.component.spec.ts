import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from "@angular/core/testing";

import { UserInfoComponent } from "./user-info.component";
import { UserService } from "../user/user.service";
import { LocalStorageService } from "../common/localStorage.service";
import { RouterTestingModule } from "@angular/router/testing";
import { appRoutes } from "../app.module";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

describe("UserInfoComponent", () => {
  let component: UserInfoComponent;
  let fixture: ComponentFixture<UserInfoComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(appRoutes)],
      declarations: [UserInfoComponent],
      providers: [LocalStorageService, UserService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture.detectChanges();
  });

  it("should create UserInfoComponent", () => {
    expect(component).toBeTruthy();
  });

  it('navigate to "add-user" redirects to "/add-user"', fakeAsync(() => {
    router.navigate(["add-user"]);
    tick();
    expect(location.path()).toBe("/add-user");
  }));

  it('redirect to "/add-user" on onClickAddUser()', fakeAsync(() => {
    let addUserBtn = fixture.debugElement.nativeElement.querySelector("button");
    addUserBtn.click();
    tick();
    expect(location.path()).toBe("/add-user");
  }));
});
