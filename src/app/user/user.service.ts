import { Injectable } from "@angular/core";
import { LocalStorageService } from "../common/localStorage.service";

export interface UserElement {
  position?: number;
  name: string;
  gender: string;
  married: string;
  husbandName?: string;
  fatherName?: string;
  dob: string;
  phoneNumber: string;
  aadharNumber: string;
  panNumber: string;
}

@Injectable()
export class UserService {
  constructor(private localStorageService: LocalStorageService) {}

  getUserById(id: number) {
    let userInfoData = this.localStorageService.get("user-info-data");
    let userDataById = userInfoData.users[id];
    if (userDataById) {
      return {
        status: "success",
        message: "User found",
        user: userDataById,
      };
    } else {
      return {
        status: "error",
        message: "User not found",
      };
    }
  }

  checkIfUserAlreadyExistsByName(name: string) {
    let allUsers = this.getAllUsers(),
      userAlreadyExists: boolean = false;
    for (let userIndex = 0; userIndex < allUsers.length; userIndex++) {
      if (allUsers[userIndex].name === name) {
        userAlreadyExists = true;
        break;
      }
    }
    return userAlreadyExists;
  }

  addNewUser(user: UserElement) {
    if (this.checkIfUserAlreadyExistsByName(user.name)) {
      return {
        status: "error",
        message: "User already exists",
      };
    } else {
      let userInfoData = this.localStorageService.get("user-info-data");
      let allUsersData = {},
        lastUserPositionAdded = 0;
      if (userInfoData === null || userInfoData === undefined) {
        userInfoData = { users: {}, lastUserAdded: 0 };
        this.localStorageService.set("user-info-data", userInfoData);
      } else {
        allUsersData = userInfoData.users;
        lastUserPositionAdded = userInfoData.lastUserAdded;
      }

      let newPosition = lastUserPositionAdded + 1;
      user.position = newPosition;
      userInfoData.users[newPosition] = user;
      userInfoData.lastUserAdded = newPosition;
      this.localStorageService.set("user-info-data", userInfoData);

      return {
        status: "success",
        message: "User added successfully",
        userId: user.position,
      };
    }
  }

  getAllUsers(): UserElement[] {
    let userInfoData = this.localStorageService.get("user-info-data");
    if (userInfoData === null) {
      return [];
    } else {
      return Object.values(userInfoData.users);
    }
  }

  editUser(user: UserElement) {
    let userInfoData = this.localStorageService.get("user-info-data");
    if (userInfoData) {
      let userDataById = userInfoData.users[user.position];
      if (userDataById) {
        let allUsersData = userInfoData.users;
        allUsersData[user.position] = user;

        let updatedUserInfodata = {
          users: allUsersData,
          lastUserAdded: userInfoData.lastUserAdded,
        };
        this.localStorageService.set("user-info-data", updatedUserInfodata);
        return {
          status: "success",
          message: "User edited successfully",
        };
      }
    }
    return {
      status: "error",
      message: "User not found",
    };
  }
}
