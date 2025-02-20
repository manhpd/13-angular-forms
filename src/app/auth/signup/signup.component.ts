import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {

  signupForm = new FormGroup({
    email: new FormControl('', {
      validators: [
        Validators.required,
        Validators.email
      ]
    }),

    passwords: new FormGroup({
      password: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(6)
        ]
      }),
      confirmPassword: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(6)
        ]
      }),
    }, {
      validators: [
        (formGroup) => {
          const password = formGroup.get('password');
          const confirmPassword = formGroup.get('confirmPassword');
          if (password?.value !== confirmPassword?.value) {
            confirmPassword?.setErrors({ passwordsDoNotMatch: true });
          } else {
            confirmPassword?.setErrors(null);
          }
          return null;
        }
      ]
    }),
   
    firstName: new FormControl('', {
      validators: [
        Validators.required
      ]
    }),
    lastName: new FormControl('', {
      validators: [
        Validators.required
      ]
    }),

    address: new FormGroup({
      number: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern(/^[0-9]*$/)
        ]
      }),
      street: new FormControl('', {
        validators: [
          Validators.required
        ]
      }),
      city: new FormControl('', {
        validators: [
          Validators.required
        ]
      }),
      postalCode: new FormControl('', {
        validators: [
          Validators.required
        ]
      }),
    }),
    
    role: new FormControl <'student' | 'teacher' | 'employee' | 'founder' | 'other'>('student', {
      validators: [
        Validators.required
      ] 
    }),
    agree : new FormControl(false, {
      validators: [
        Validators.requiredTrue
      ]
    })
  });

  get emailIsInvalid() {
    const email = this.signupForm.get('email');
    return email?.invalid && email.touched;
  }

  get passwordIsInvalid() {
    const password = this.signupForm.get('password');
    return password?.invalid && password.touched;
  }

  get confirmPasswordIsInvalid() {
    const confirmPassword = this.signupForm.get('confirmPassword');
    return confirmPassword?.invalid && confirmPassword.touched;
  }

  get passwordsDoNotMatch() {
    const password = this.signupForm.get('password');
    const confirmPassword = this.signupForm.get('confirmPassword');
    return password?.value !== confirmPassword?.value;
  }

  onSubmit() {
    console.log(this.signupForm.value);
  }

  onReset() {
    this.signupForm.reset();
  }
}
