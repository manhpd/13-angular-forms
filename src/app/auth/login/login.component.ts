import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor() {
  }

  login(formData: NgForm) {
    const form = formData.form;
    if (form.invalid) {
      return;
    }

    const email =  form.value.email;
    const password = form.value.password;
    
    console.log(email, password);
  }
}
