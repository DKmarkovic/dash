import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {  this.registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    name: ['', Validators.required],
    surname: ['', Validators.required],
    mobileNumber: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    birthdate: ['', [Validators.required, birthdateValidator()]],
    role: ['', Validators.required] // You might want to customize the validation here
  });
  // Custom validator function to check if the birthdate is valid
function birthdateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const birthdate = new Date(control.value);

    // Check if the birthdate is a valid date
    if (isNaN(birthdate.getTime())) {
      return { invalidDate: true };
    }

    // Check additional criteria here (e.g., minimum age, maximum age)

    return null; // Return null if the birthdate is valid
  };
}




}

ngOnInit() {
  this.registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    name: ['', Validators.required],
    surname: ['', Validators.required],
    mobileNumber: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    birthdate: ['', [Validators.required]],
    role: ['', Validators.required]
  });
}



  
  registerUser() {
    if (this.registerForm.valid) {
      // Ensure form controls exist and are not null before accessing their values
      const name = this.registerForm.get('name')?.value;
      const surname = this.registerForm.get('surname')?.value;
      const mobileNumber = this.registerForm.get('mobileNumber')?.value;
      const address = this.registerForm.get('address')?.value;
      const city = this.registerForm.get('city')?.value;
      const birthdate = this.registerForm.get('birthdate')?.value;
      const role = this.registerForm.get('role')?.value;
  
      const registrationData = {
        ...this.registerForm.value,
        name: name,
        surname: surname,
        mobileNumber: mobileNumber,
        address: address,
        city: city,
        birthdate: birthdate,
        role: role
      };
  
      this.authService.registerUser(registrationData).subscribe(
        (res: any) => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/special']);
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }
  
  
}
