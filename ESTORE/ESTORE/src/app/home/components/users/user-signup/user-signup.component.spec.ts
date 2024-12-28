import { ComponentFixture, TestBed,fakeAsync,tick } from '@angular/core/testing';
import { UserService } from 'src/app/home/services/users/user-service';
import { UserSignupComponent } from './user-signup.component';
import { UserServiceMock } from 'src/app/shared/mocks/user-service.service.mocks';
import { ReactiveFormsModule } from '@angular/forms';
import {of,throwError} from 'rxjs'
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserSignupComponent', () => {
  let component: UserSignupComponent;
  let fixture: ComponentFixture<UserSignupComponent>;
  let userService:UserService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserSignupComponent],
      providers:[{provide:UserService,useClass:UserServiceMock}],
      imports:[ReactiveFormsModule,RouterTestingModule]
    });
    fixture = TestBed.createComponent(UserSignupComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require the value in firstName in field',()=>{
    component.firstName?.patchValue('');
    fixture.detectChanges();
    expect(component.firstName?.valid).toBeFalse();

    component.firstName?.patchValue('Tom');
    fixture.detectChanges();
    expect(component.firstName?.valid).toBeTrue();
  });

  it('should require the value in Email in field',()=>{
    component.email?.patchValue('');
    fixture.detectChanges();
    expect(component.email?.valid).toBeFalse();

    component.email?.patchValue('abc@gmail.com');
    fixture.detectChanges();
    expect(component.email?.valid).toBeTrue();

    component.email?.patchValue('Tom');
    fixture.detectChanges();
    expect(component.email?.valid).toBeFalse();
  });

  it('should match password and confirm password field',()=>{
    component.password?.patchValue('pass1');
    component.confirmPassword?.patchValue('paas2');
    fixture.detectChanges();
    expect(component.userSignUpForm.errors?.['passwordMismatch']).toBeTrue();


    component.password?.patchValue('pass1');
    component.confirmPassword?.patchValue('pass1');
    fixture.detectChanges();
    expect(component.userSignUpForm.errors?.['passwordMismatch']).toBeUndefined();
  });

  //fakeAsync is used because the function is returning the Observable
  it('should set success message for creating user successfully',fakeAsync(()=>{
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate');
    spyOn(userService,'createUser').and.returnValue(of({message:'success'}));
    component.onSubmit();
    tick(); // waits for async function to finish the procedure
    expect(component.alertMessage).toEqual('User created successfully');
    expect(component.alertType).toEqual(0);
    expect(navigateSpy).toHaveBeenCalledWith(['/home/login']);
  }));

  it('should set email error message if email already exists',fakeAsync(()=>{
    spyOn(userService,'createUser').and.returnValue(of({message:"Email Already Exists"}));
    component.onSubmit();
    tick();
    expect(component.alertMessage).toEqual('Email Already Exists');
    expect(component.alertType).toEqual(1);
  }));

  it('should set error message if error is received while creating user',fakeAsync(()=>{
    spyOn(userService,'createUser').and.returnValue(
      throwError(()=>{
        const err=new Error();
        err.message = 'Errors occurred';
        return err;
      })
    );

    component.onSubmit();
    tick();
    expect(component.alertMessage).toEqual('Errors occurred');
    expect(component.alertType).toEqual(2);
  }))
  

});
