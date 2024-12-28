import { TestBed } from '@angular/core/testing';

import { UserService } from './user-service';
import {  HttpClientTestingModule,HttpTestingController,TestRequest } from '@angular/common/http/testing';
import { loggedInUser, user } from '../../types/users.types';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController:HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController)

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create user on calling this method',()=>{
    const user={
      firstName:"Durvesh",
      lastName:"Kulkarni",
      address:"123 london street",
      city:"Pune",
      state:"MH",
      pin:"123123",
      email:"sunil@gmail.com",
      password:"asda132"
    };

    const mockResponse = { message: "User created successfully" }; // Example response

      // Call the method
      service.createUser(user).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });
      
      // Expect one HTTP request
      const request = httpTestingController.expectOne("http://localhost:5001/users/signup");

      // Check the request method
      expect(request.request.method).toBe('POST');

      // Check the request body
      expect(request.request.body).toEqual(user);

      // Flush the request with mock response
      request.flush(mockResponse);

    
  });

  it('should call login method',()=>{
    const email = "d@gmail.com";
    const password="asd1231";
    const mockResponse = {message:"Login Successfull"};

    service.login(email,password).subscribe(response=>{
      expect(response).toEqual(mockResponse)
    });

    const request = httpTestingController.expectOne("http://localhost:5001/users/login");


    expect(request.request.method).toBe("POST");
    expect(request.request.body).toEqual({email:email,password:password});
    request.flush(mockResponse);
  });

  it('should call activate token in user service',()=>{
    const mockUser:loggedInUser={
      firstName:"Durvesh",
      lastName:"Kulkarni",
      address:"123 london street",
      city:"Pune",
      state:"MH",
      pin:"123123",
      email:"sunil@gmail.com",
      //password:"asda132"
    };
    const loginToken ={
      token:"sbwshbibibihbiwhbcxiwhbwsxbijnfivhbi",
      expiresInSeconds:3000,
      user:mockUser
    }
    spyOn(localStorage, 'setItem');
    // spyOn(service.isAuthenticated,'next');
    // spyOn(service.loggedInUserInfo,'next');

    //as they are private we can't spy on them so we need to make them as observables

    // Subscribe to observables
    let isAuthenticatedValue: boolean=false;
    let loggedInUserInfoValue: loggedInUser|null=null;

    service.isUserAuthenticated$.subscribe(value=>(isAuthenticatedValue=value));
    service.loggedInUser$.subscribe(value=>{loggedInUserInfoValue = value });

    service.activateToken(loginToken);
    expect(localStorage.setItem).toHaveBeenCalledWith('token', loginToken.token);
    expect(localStorage.setItem).toHaveBeenCalledWith('expiry', jasmine.any(String));
    expect(localStorage.setItem).toHaveBeenCalledWith('firstName', mockUser.firstName);
    expect(localStorage.setItem).toHaveBeenCalledWith('lastName', mockUser.lastName);
    expect(localStorage.setItem).toHaveBeenCalledWith('address', mockUser.address);
    expect(localStorage.setItem).toHaveBeenCalledWith('city', mockUser.city);
    expect(localStorage.setItem).toHaveBeenCalledWith('pin', mockUser.pin);
    expect(localStorage.setItem).toHaveBeenCalledWith('state', mockUser.state);
    expect(localStorage.setItem).toHaveBeenCalledWith('email', mockUser.email);

    expect(isAuthenticatedValue).toBeTrue();
      // Add a type check to ensure `loggedInUserInfoValue` is not null
    expect(loggedInUserInfoValue).not.toBeNull();
    if (loggedInUserInfoValue !== null) {
      expect(loggedInUserInfoValue).toEqual(mockUser);
    }
  });

  it('should call logout method',()=>{
    spyOn(localStorage,'clear');
    spyOn(window,'clearTimeout');
    let isAuthenticated:boolean=false;
    let loggedInUser:loggedInUser|null={
      firstName: "John",
      lastName: "Doe",
      address: "123 Main St",
      city: "Pune",
      state: "MH",
      pin: "411001",
      email: "john.doe@example.com",
    };
    service.isUserAuthenticated$.subscribe(value=>isAuthenticated=value);
    service.loggedInUser$.subscribe(value => loggedInUser = value);
    service.logout();

    expect(localStorage.clear).toHaveBeenCalled();
    expect(isAuthenticated).toBeFalse();
    expect(loggedInUser).toEqual(jasmine.objectContaining({}));
    expect(clearTimeout).toHaveBeenCalledWith(service['autoLogoutTimer']);
  });

  // it('should load token when expires in sec is greater than 0', () => {
  //   // Mock localStorage items
  //   const mockToken = 'sbwshbibibihbiwhbcxiwhbwsxbijnfivhbi';
  //   const mockExpiry = new Date(Date.now() + 300 * 1000).toISOString(); // 5 minutes from now
  
  //   // Mock data for user info
  //   const mockUser: loggedInUser = {
  //     firstName: 'Durvesh',
  //     lastName: 'Kulkarni',
  //     address: '123 London street',
  //     city: 'Pune',
  //     state: 'MH',
  //     pin: '123123',
  //     email: 'sunil@gmail.com'
  //   };
  
  //   // Mock localStorage getItem method
  //   spyOn(localStorage, 'getItem').and.callFake((key: string) => {
  //     if (key === 'token') return mockToken;
  //     if (key === 'expiry') return mockExpiry;
  //     if (key === 'firstName') return mockUser.firstName;
  //     if (key === 'lastName') return mockUser.lastName;
  //     if (key === 'address') return mockUser.address;
  //     if (key === 'city') return mockUser.city;
  //     if (key === 'state') return mockUser.state;
  //     if (key === 'pin') return mockUser.pin;
  //     if (key === 'email') return mockUser.email;
  //     return null;
  //   });
  
  //   const setAutoLogoutTimerSpy = spyOn(service as any, 'setAutoLogoutTimer'); // Spy on setAutoLogoutTimer
  //   spyOn(window, 'clearTimeout'); // Spy on clearTimeout
  
  //   let isAuthenticated: boolean = false;
  //   let loggedInUser: loggedInUser | null = null;
  
  //   // Subscribe to observables
  //   service.isUserAuthenticated$.subscribe(value => isAuthenticated = value);
  //   service.loggedInUser$.subscribe(value => loggedInUser = value);
  
  //   // Call the method under test
  //   service.loadToken();
  
  //   // Validate localStorage getItem calls
  //   expect(localStorage.getItem).toHaveBeenCalledWith('token');
  //   expect(localStorage.getItem).toHaveBeenCalledWith('expiry');
  //   expect(localStorage.getItem).toHaveBeenCalledWith('firstName');
  //   expect(localStorage.getItem).toHaveBeenCalledWith('lastName');
  //   expect(localStorage.getItem).toHaveBeenCalledWith('address');
  //   expect(localStorage.getItem).toHaveBeenCalledWith('city');
  //   expect(localStorage.getItem).toHaveBeenCalledWith('state');
  //   expect(localStorage.getItem).toHaveBeenCalledWith('pin');
  //   expect(localStorage.getItem).toHaveBeenCalledWith('email');
  
  //   // Validate that the user is authenticated and user info is set correctly
  //   expect(isAuthenticated).toBeTrue();
  //   //expect(loggedInUser).toEqual(mockUser);
  
  //   // Validate that setAutoLogoutTimer is called with the correct expiry time
  //   const expiresIn = 300000;
  //   const timerCallArgs = setAutoLogoutTimerSpy.calls.argsFor(0);
  //   expect(Math.abs(timerCallArgs[0] - expiresIn)).toBeLessThanOrEqual(1);

  //   expect(service["setAutoLogoutTimer"]).toHaveBeenCalledWith(expiresIn);
  
  //   // Validate that authToken is set
  //   expect(service['authToken']).toEqual(mockToken);
  
  //   // Validate that clearTimeout was not called (because token is valid)
  //   expect(clearTimeout).not.toHaveBeenCalled();
  // });
  it('should load token when expires in sec is greater than 0', () => {
    // Mock localStorage items
    const mockToken = 'sbwshbibibihbiwhbcxiwhbwsxbijnfivhbi';
    const mockExpiry = new Date(Date.now() + 300 * 1000).toISOString(); // 5 minutes from now
  
    // Mock data for user info
    const mockUser: loggedInUser = {
      firstName: 'Durvesh',
      lastName: 'Kulkarni',
      address: '123 London street',
      city: 'Pune',
      state: 'MH',
      pin: '123123',
      email: 'sunil@gmail.com'
    };
  
    // Mock localStorage getItem method
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'token') return mockToken;
      if (key === 'expiry') return mockExpiry;
      if (key === 'firstName') return mockUser.firstName;
      if (key === 'lastName') return mockUser.lastName;
      if (key === 'address') return mockUser.address;
      if (key === 'city') return mockUser.city;
      if (key === 'state') return mockUser.state;
      if (key === 'pin') return mockUser.pin;
      if (key === 'email') return mockUser.email;
      return null;
    });
  
    // Spy on setAutoLogoutTimer (make sure it's properly spied on)
    const setAutoLogoutTimerSpy = spyOn(service as any, 'setAutoLogoutTimer');
    spyOn(window, 'clearTimeout'); // Spy on clearTimeout
  
    let isAuthenticated: boolean = false;
    let loggedInUser: loggedInUser | null = null;
  
    // Subscribe to observables
    service.isUserAuthenticated$.subscribe(value => isAuthenticated = value);
    service.loggedInUser$.subscribe(value => loggedInUser = value);
  
    // Call the method under test
    service.loadToken();
  
    // Validate localStorage getItem calls
    expect(localStorage.getItem).toHaveBeenCalledWith('token');
    expect(localStorage.getItem).toHaveBeenCalledWith('expiry');
    expect(localStorage.getItem).toHaveBeenCalledWith('firstName');
    expect(localStorage.getItem).toHaveBeenCalledWith('lastName');
    expect(localStorage.getItem).toHaveBeenCalledWith('address');
    expect(localStorage.getItem).toHaveBeenCalledWith('city');
    expect(localStorage.getItem).toHaveBeenCalledWith('state');
    expect(localStorage.getItem).toHaveBeenCalledWith('pin');
    expect(localStorage.getItem).toHaveBeenCalledWith('email');
  
    // Validate that the user is authenticated and user info is set correctly
    expect(isAuthenticated).toBeTrue();
    
    // Validate that setAutoLogoutTimer is called with the correct expiry time, allow a margin of 1ms
    const expiresIn = 300000;
    const timerCallArgs = setAutoLogoutTimerSpy.calls.argsFor(0) as [number];
    expect(Math.abs(timerCallArgs[0] - expiresIn)).toBeLessThanOrEqual(1);
  
    // Validate that authToken is set
    expect(service['authToken']).toEqual(mockToken);
  
    // Validate that clearTimeout was not called (because token is valid)
    expect(clearTimeout).not.toHaveBeenCalled();
  });
  


  // it('should return correct values from getters', () => {
  //   // Mock user data
  //   const mockUser: loggedInUser = {
  //     firstName: 'Durvesh',
  //     lastName: 'Kulkarni',
  //     address: '123 London street',
  //     city: 'Pune',
  //     state: 'MH',
  //     pin: '123123',
  //     email: 'sunil@gmail.com'
  //   };
  
  //   // Mock values for authToken and isAuthenticated
  //   const mockToken = 'sbwshbibibihbiwhbcxiwhbwsxbijnfivhbi';
  //   const mockIsAuthenticated = true;
  
  //   // Spy on BehaviorSubjects
  //   spyOnProperty(service['loggedInUserInfo'], 'value', 'get').and.returnValue(mockUser);
  //   //spyOnProperty(service, 'authToken', 'get').and.returnValue(mockToken);
  //   spyOnProperty(service['isAuthenticated'], 'value', 'get').and.returnValue(mockIsAuthenticated);
  
  //   // Test getters
  //   const loggedInUser = service.loggedInUser;
  //   const token = service.token;
  //   const isUserAuthenticated = service.isUserAuthenticated;
  
  //   // Validate getter values
  //   expect(loggedInUser).toEqual(mockUser);
  //   expect(token).toEqual(mockToken);
  //   expect(isUserAuthenticated).toBeTrue();
  // });
  it('should return correct values from getters', () => {
    // Mock user data
    const mockUser: loggedInUser = {
      firstName: 'Durvesh',
      lastName: 'Kulkarni',
      address: '123 London street',
      city: 'Pune',
      state: 'MH',
      pin: '123123',
      email: 'sunil@gmail.com'
    };
  
    // Mock values for authToken and isAuthenticated
    const mockToken = 'sbwshbibibihbiwhbcxiwhbwsxbijnfivhbi';
    const mockIsAuthenticated = true;
  
    // Ensure the 'loggedInUserInfo' BehaviorSubject has the correct value
    spyOnProperty(service['loggedInUserInfo'], 'value', 'get').and.returnValue(mockUser);
    // Mock authToken by directly setting it on the service (or spy on the property)
    service['authToken'] = mockToken; // Directly set it here for the test
    spyOnProperty(service['isAuthenticated'], 'value', 'get').and.returnValue(mockIsAuthenticated);
  
    // Test getters
    const loggedInUser = service.loggedInUser;
    const token = service.token;
    const isUserAuthenticated = service.isUserAuthenticated;
  
    // Validate getter values
    expect(loggedInUser).toEqual(mockUser);
    expect(token).toEqual(mockToken);  // Should now return mockToken
    expect(isUserAuthenticated).toBeTrue();
  });
  
});
