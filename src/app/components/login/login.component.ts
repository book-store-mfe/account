import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService, ProfileStateService } from '@bookstore-app/shared-lib';
import { AccountFormComponent } from '../account-form/account-form.component';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, AccountFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  auth = inject(AuthService)
  router = inject(Router)
  state = inject(ProfileStateService);

  emailControl = new FormControl('', [Validators.required])
  signUpMode = signal(false);

  errorMessage() {
    const errors = this.emailControl.errors;
    if (errors?.['required']) return 'E-mail é obrigatorio';
    if (errors?.['invalidLogin']) return 'Login inválido';
    return ''
  }

  signInSubmit() {
    if (this.emailControl.invalid) {
      this.emailControl.markAsTouched();
      return;
    };
    const user = this.auth.signIn(this.emailControl.value!);
    if (!user) {
      this.emailControl.setErrors({ invalidLogin: true })
      return;
    }
    this.state.name.set(user.name)
    this.state.email.set(user.email)
    this.router.navigate(['/']);
  }

  enterSignUpMode() {
    this.signUpMode.set(true);
  }

  signUp() {
    if (!this.state.name() || !this.state.email()) return

    this.auth.signUp(this.state.name(), this.state.email());
    const user = this.auth.signIn(this.state.email());

    if (!user) return;

    this.state.name.set(user.name)
    this.state.email.set(user.email)
    this.router.navigate(['/']);
  }

}
