import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserElement, UserService } from "../user/user.service";
import { AutoCompleteService } from "../common/autocomplete/autocomplete.service";

@Component({
  selector: "app-user-info",
  templateUrl: "./user-info.component.html",
  styleUrls: ["./user-info.component.css"],
  providers: [AutoCompleteService],
})
export class UserInfoComponent implements OnInit {
  displayedColumns: string[] = [
    "position",
    "name",
    "gender",
    "married",
    "husbandName",
    "fatherName",
    "dob",
    "phoneNumber",
    "aadharNumber",
    "panNumber",
    "edit",
  ];

  dataSource: UserElement[] = [];
  datasourceForAutocomplete;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    let userInfoData = this.userService.getAllUsers();
    this.dataSource = userInfoData;
  }

  onClickAddUser() {
    this.router.navigate(["/add-user"]);
  }

  onClickEditUser(element: UserElement) {
    this.router.navigate(["/edit-user", element.position]);
  }

  formatDateForUI(dateString: string) {
    return new Date(dateString).toLocaleDateString();
  }
}
