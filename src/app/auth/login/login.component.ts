import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, delay, of } from 'rxjs';

function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.indexOf('?') === -1) {
    return { mustContainQuestionMark: true };
  }
  return null;
}

function emailIsUnique(control: AbstractControl) {
  if (control.value === 'test@example.com') {
      return of({ emailIsUnique: true });
  }
  return of(null);
}

let initialEmail = '';

const savedLoginForm = window.localStorage.getItem('saved-login-form');
if (savedLoginForm) {
  initialEmail = JSON.parse(savedLoginForm).email;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})


export class LoginComponent implements OnInit {

  private destroyRef = inject(DestroyRef);

  loginForm = new FormGroup(
    {
      email: new FormControl(initialEmail,{
        validators: [Validators.required, Validators.email],
        updateOn: 'blur',
        asyncValidators: [
          emailIsUnique
        ],
      }),
      password: new FormControl('', {
        validators: [
          Validators.required, 
          Validators.minLength(6),
          mustContainQuestionMark
        ],
        
        updateOn: 'blur'
      }),
    }
  );

  get emailIsInvalid() {
    return this.loginForm.controls.email.touched && this.loginForm.controls.email.dirty && this.loginForm.controls.email.invalid;
  }

  get passwordIsInvalid() {
    return this.loginForm.controls.password.touched && this.loginForm.controls.password.dirty && this.loginForm.controls.password.invalid;
  }

  ngOnInit() {
    const subscrition = this.loginForm.valueChanges.pipe(debounceTime(500)).subscribe({
      next: (value) => {
        window.localStorage.setItem('saved-login-form', JSON.stringify({
          email: value.email
        }));
      }
    });

    this.destroyRef.onDestroy(() => {
        subscrition.unsubscribe();
      }
    );

    // const savedLoginForm = window.localStorage.getItem('saved-login-form');
    // if (savedLoginForm) {
    //   this.loginForm.patchValue(JSON.parse(savedLoginForm));
    // }
  }
  onSubmit() {
    console.log(this.loginForm.value);
  }
}