import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { UserService } from 'src/app/home/services/users/user-service';
import { UserServiceMock } from 'src/app/shared/mocks/user-service.service.mocks';

import { UserLoginComponent } from './user-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('UserLoginComponent', () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserLoginComponent],
      providers:[
        {provide:UserService,useClass:UserServiceMock}
      ],
      imports:[ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login method and return login successful message',fakeAsync(()=>{
    const loggedInUser={
      firstName:"Durvesh",
      lastName:"Kulkarni",
      address:"123 london streeet",
      city:"London",
      state:"London",
      pin:"123123",
      email:"d@gmail.com"
    }
    
    const login = {
      token:"adbajshdbajhbjahcxbjhbjhbdwjhebjhdbwdjewhbjwhbw",
      expiresInSeconds:300,
      user:loggedInUser
    }
    
    spyOn(component['userService'],'login').and.returnValue(of(login));
    spyOn(component['userService'], 'activateToken');
    spyOn(component['location'], 'back');
  
    // Set form control values
    component.userLoginForm.controls['email'].setValue('d@gmail.com');
    component.userLoginForm.controls['password'].setValue('password123');

    component.onSubmit();
    expect(component['userService'].login).toHaveBeenCalledWith('d@gmail.com', 'password123');

    // Validate that activateToken was called with the correct result
    expect(component['userService'].activateToken).toHaveBeenCalledWith(login);

    // Validate alertType and alertMessage
    expect(component.alertType).toBe(0);
    expect(component.alertMessage).toBe("Login Successful");

    // Validate location.back was called
    tick(1000);
    expect(component['location'].back).toHaveBeenCalled();

  }));

  it('should handle login error and set error message',()=>{
    const errormessage = "Invalid credentials";
    spyOn(component['userService'],'login').and.returnValue(
      throwError({error:{message:errormessage}})
    );


    // Set form control values
  component.userLoginForm.controls['email'].setValue('d@gmail.com');
  component.userLoginForm.controls['password'].setValue('wrongpassword');

  // Call onSubmit
  component.onSubmit();

  // Validate alertType and alertMessage
  expect(component.alertType).toBe(2);
  expect(component.alertMessage).toBe(errormessage);

  // Ensure activateToken was not called
  spyOn(component['userService'], 'activateToken');
  expect(component['userService'].activateToken).not.toHaveBeenCalled();

  // Ensure location.back was not called
  spyOn(component['location'], 'back');
  expect(component['location'].back).not.toHaveBeenCalled();
  });


});
