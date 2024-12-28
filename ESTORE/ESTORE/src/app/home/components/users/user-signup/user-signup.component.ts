import { Component , OnInit} from '@angular/core';
import { FormBuilder,FormGroup,AbstractControl,Validators } from '@angular/forms';
import { matchPassword } from './validators/match-password.validators';
import { UserService } from '../../../services/users/user-service';
import { user } from 'src/app/home/types/users.types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css'],
})
export class UserSignupComponent implements OnInit{
    userSignUpForm:FormGroup;
    alertMessage:string='';
    alertType:number=0  //0-success,1-warninng,2-error



    constructor(private fb:FormBuilder,private userService:UserService,private router:Router){}
    ngOnInit(): void {
      this.userSignUpForm=this.fb.group({
        firstName:['',Validators.required],
        lastName:[''],
        address:[''],
        city:[''],
        state:[''],
        pin:[''],
        email:['',[Validators.required,Validators.email]],
        password:['',Validators.required],
        confirmPassword:['',Validators.required]
      },
      {
        validator:matchPassword
      }
    
      )
    }

    get firstName():AbstractControl<any,any>|null{
      return this.userSignUpForm.get('firstName');
    }
    get email():AbstractControl<any,any>|null{
      return this.userSignUpForm.get('email');
    }
    get password():AbstractControl<any,any>|null{
      return this.userSignUpForm.get('password');
    }
    get confirmPassword():AbstractControl<any,any>|null{
      return this.userSignUpForm.get('confirmPassword');
    }

    onSubmit():void{
      const user:user={
        firstName:this.firstName?.value,
        lastName:this.userSignUpForm.get('lastName')?.value,
        address:this.userSignUpForm.get("address")?.value,
        city:this.userSignUpForm.get("city")?.value,
        state:this.userSignUpForm.get("state")?.value,
        pin:this.userSignUpForm.get("pin")?.value,
        email:this.email?.value,
        password:this.password?.value      
      }
      
      this.userService.createUser(user).subscribe({
        next:(result)=>{
          if(result.message==="success"){
            this.alertMessage = 'User created successfully',
            this.alertType = 0;
            this.router.navigate(['/home/login']);
          }else if(result.message==="Email Already Exists"){
            this.alertMessage = result.message,
            this.alertType = 1;

          }
        },
        error:(error)=>{
          this.alertMessage = "Errors occurred";
          this.alertType = 2;
        }
      })


    }
}
