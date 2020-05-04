import { async, TestBed, getTestBed } from "@angular/core/testing";
import { UserService, UserElement } from "./user.service";
import { LocalStorageService } from "../common/localStorage.service";

describe("UserService", () => {
  let userService: UserService;
  let localStorageService: LocalStorageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [],
      providers: [LocalStorageService, UserService],
    }).compileComponents();
  }));

  beforeEach(() => {
    userService = TestBed.inject(UserService);
    localStorageService = TestBed.inject(LocalStorageService);
    localStorageService.clear();
  });

  it("adding valid user", () => {
    let addNewUserObject: UserElement = {
      name: "User 1",
      gender: "M",
      married: "No",
      fatherName: "User 1's father",
      dob: "01/01/1980",
      phoneNumber: "9810198101",
      aadharNumber: "2525642526541234",
      panNumber: "BJSDS4S2",
    };

    let addUserResObj = userService.addNewUser(addNewUserObject);
    expect(addUserResObj.status).toEqual("success");
    expect(addUserResObj.message).toEqual("User added successfully");

    //Fetch user by id from the service for comparison
    let getUserById = userService.getUserById(addUserResObj.userId);

    //Add generated user id from addNewUser() to the source object and compare it with the newly inserted object for equality
    addNewUserObject.position = addUserResObj.userId;
    expect(getUserById.user).toEqual(addNewUserObject);
  });

  it("adding user with same name", () => {
    let addNewUserObject: UserElement = {
      name: "User 1",
      gender: "M",
      married: "No",
      fatherName: "User 1's father",
      dob: "01/01/1980",
      phoneNumber: "9810198101",
      aadharNumber: "2525642526541234",
      panNumber: "BJSDS4S2",
    };

    let addUserResObj = userService.addNewUser(addNewUserObject);
    expect(addUserResObj.status).toEqual("success");
    expect(addUserResObj.message).toEqual("User added successfully");

    expect(userService.addNewUser(addNewUserObject)).toEqual({
      status: "error",
      message: "User already exists",
    });
  });

  it("editing valid user id", () => {
    let addNewUserObject: UserElement = {
      name: "User 2",
      gender: "M",
      married: "No",
      fatherName: "User 2's father",
      dob: "01/01/1980",
      phoneNumber: "9810198101",
      aadharNumber: "2525642526541234",
      panNumber: "BJSDS4S2",
    };
    let addUserResObj = userService.addNewUser(addNewUserObject);
    expect(addUserResObj.status).toEqual("success");

    addNewUserObject.married = "Yes";
    addNewUserObject.position = addUserResObj.userId;
    expect(userService.editUser(addNewUserObject)).toEqual({
      status: "success",
      message: "User edited successfully",
    });
  });

  it("editing invalid user id", () => {
    let editUserObject: UserElement = {
      position: 10101010,
      name: "User 1",
      gender: "M",
      married: "No",
      fatherName: "User 1's father",
      dob: "01/01/1980",
      phoneNumber: "9810198101",
      aadharNumber: "2525642526541234",
      panNumber: "BJSDS4S2",
    };

    expect(userService.editUser(editUserObject)).toEqual({
      status: "error",
      message: "User not found",
    });
  });
});
