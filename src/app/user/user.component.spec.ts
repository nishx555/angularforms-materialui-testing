import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { UserComponent } from "./user.component";
import { UserService, UserElement } from "./user.service";
import { LocalStorageService } from "../common/localStorage.service";
import { appRoutes } from "../app.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

describe("UserComponent", () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(appRoutes),
        ReactiveFormsModule,
        FormsModule,
      ],
      declarations: [UserComponent],
      providers: [LocalStorageService, UserService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create UserComponent", () => {
    expect(component).toBeTruthy();
  });

  it("user form invalid when empty", () => {
    expect(component.userForm.value.valid).toBeFalsy();
  });

  it("fatherName enabled & husbandName disabled on first load (gender == 'M' and married == false)", () => {
    expect(component.userForm.get("husbandName").disabled).toBeTruthy();
    expect(component.userForm.get("fatherName").disabled).toBeFalsy();
  });

  it("user form - valid aadhar number check", () => {
    let aadharNumber = component.userForm.controls["aadharNumber"];
    aadharNumber.setValue("1234567891010226");
  });

  it("user form - invalid aadhar number check", () => {
    let aadharNumber = component.userForm.controls["aadharNumber"];
    aadharNumber.setValue("123456789101022a");
    expect(component.userForm.get("aadharNumber").invalid).toBeTruthy();
    expect(
      component.userForm.get("aadharNumber").errors["pattern"]
    ).toBeTruthy();
  });

  it("submitting a valid form", () => {
    let newUserForm: UserElement = {
      name: "User 1",
      gender: "M",
      married: "No",
      fatherName: "User 1's father",
      dob: "01/01/1980",
      phoneNumber: "9810198101",
      aadharNumber: "2525642526541234",
      panNumber: "BJSDS4S2",
    };

    expect(component.userForm.value.valid).toBeFalsy();
    component.userForm.get("name").setValue(newUserForm.name);
    component.userForm.get("gender").setValue(newUserForm.gender);
    component.userForm.get("married").setValue(newUserForm.married);
    component.userForm.get("fatherName").setValue(newUserForm.fatherName);
    component.userForm.get("dob").setValue(newUserForm.dob);
    component.userForm.get("phoneNumber").setValue(newUserForm.phoneNumber);
    component.userForm.get("aadharNumber").setValue(newUserForm.aadharNumber);
    component.userForm.get("panNumber").setValue(newUserForm.panNumber);
    // expect(component.userForm.value.valid).toBeTruthy();

    // component.onFormSubmit();
  });
});
