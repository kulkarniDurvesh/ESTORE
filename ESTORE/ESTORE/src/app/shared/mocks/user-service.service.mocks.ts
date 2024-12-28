import { Observable, of } from "rxjs";
import { loggedInUser } from "src/app/home/types/users.types";

export class UserServiceMock {
    // Mocking isUserAuthenticated as a getter
    private _isUserAuthenticated = true; // default value
  
    // Getter for isUserAuthenticated
    get isUserAuthenticated(): boolean {
      return this._isUserAuthenticated;
    }
  
    isUserAuthenticated$: Observable<boolean> = of(true);
  
    // Mock loggedInUser as a getter (already implemented)
    private _loggedInUser: loggedInUser = {
        email: 'test@gmail.com', firstName: 'Tom',
        lastName: "",
        address: "",
        city: "",
        state: "",
        pin: ""
    };
    get loggedInUser(): loggedInUser {
      return this._loggedInUser;
    }
  
    loggedInUser$: Observable<loggedInUser> = of(this._loggedInUser);
  
    // Other methods...
    token = 'token123';
    createUser(): any {}
    login(): any {}
    activateToken(): any {}
    logout(): any {}
    loadToken(): any {}
  }