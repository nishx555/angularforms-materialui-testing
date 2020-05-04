import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService, UserElement } from "./user.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  // nameFormControl = new FormControl("", [Validators.required]);
  startDate = new Date(1990, 0, 1);
  editMode: boolean = false;
  submitButtonText: string = "Add User";
  userForm: FormGroup;
  numericRegex = /^[0-9]*$/;
  disableFatherName: boolean = false;
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // To initialize FormGroup
    this.userForm = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(1)]),
      gender: new FormControl("M", Validators.required),
      married: new FormControl("No", Validators.required),
      husbandName: new FormControl({ value: "", disabled: true }),
      fatherName: new FormControl({ value: "", disabled: false }),
      dob: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern(this.numericRegex),
      ]),
      panNumber: new FormControl("", [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      aadharNumber: new FormControl("", [
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(16),
        Validators.pattern(this.numericRegex),
      ]),
    });
  }

  ngOnInit(): void {
    console.log(this.route);
    if (
      this.route.snapshot.routeConfig &&
      "edit-user/:id" === this.route.snapshot.routeConfig.path
    ) {
      let getUserByIdRes = this.userService.getUserById(
        this.route.snapshot.params.id
      );

      if (getUserByIdRes.status === "success") {
        let currentUser = getUserByIdRes.user;
        console.log("currentUser", currentUser);
        this.userForm = new FormGroup({
          name: new FormControl(currentUser.name, [
            Validators.required,
            Validators.minLength(1),
          ]),
          gender: new FormControl(currentUser.gender, Validators.required),
          married: new FormControl(currentUser.married, Validators.required),
          husbandName: new FormControl(currentUser.husbandName),
          fatherName: new FormControl(currentUser.fatherName),
          dob: new FormControl(currentUser.dob, Validators.required),
          phoneNumber: new FormControl(currentUser.phoneNumber, [
            Validators.required,
            Validators.maxLength(10),
            Validators.pattern(this.numericRegex),
          ]),
          panNumber: new FormControl(currentUser.panNumber, [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
          ]),
          aadharNumber: new FormControl(currentUser.aadharNumber, [
            Validators.required,
            Validators.minLength(16),
            Validators.maxLength(16),
            Validators.pattern(this.numericRegex),
          ]),
        });

        this.editMode = true;
        this.submitButtonText = "Update User";
        this.updateDisabledStateofHusbandFatherNames();
      } else {
        alert(getUserByIdRes.message);
        this.router.navigate(["/"]);
      }
    }
    this.userForm.get("gender").statusChanges.subscribe(() => {
      this.updateDisabledStateofHusbandFatherNames();
    });

    this.userForm.get("married").statusChanges.subscribe(() => {
      this.updateDisabledStateofHusbandFatherNames();
    });
  }

  clearForm() {
    this.userForm.reset();
    this.userForm.get("married").setValue("No");
    this.userForm.get("gender").setValue("M");
  }

  // Executed When Form Is Submitted
  onFormSubmit() {
    let alertBoxText: string;
    if (this.editMode === true) {
      this.userForm.value.position = this.route.snapshot.params.id;
      let editUserRes = this.userService.editUser(this.userForm.value);
      alertBoxText = editUserRes.message;
    } else {
      let addUserRes = this.userService.addNewUser(this.userForm.value);
      alertBoxText = addUserRes.message;
    }
    this.userForm.reset();
    alert(alertBoxText);
    this.router.navigate(["/"]);
  }

  goBackToUserInfo() {
    this.router.navigate(["/"]);
  }

  updateDisabledStateofHusbandFatherNames() {
    console.log("updateDisabledStateofHusbandFatherNames toggled");

    console.log(this.userForm.get("husbandName"));
    console.log(this.userForm.get("fatherName"));
    if (
      this.userForm.get("gender").value === "F" &&
      this.userForm.get("married").value === "Yes"
    ) {
      this.userForm.get("husbandName").enable();
      this.userForm.get("fatherName").disable();
    } else {
      this.userForm.get("husbandName").disable();
      this.userForm.get("fatherName").enable();
    }
  }
}
