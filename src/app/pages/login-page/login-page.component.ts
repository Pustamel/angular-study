import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../data/auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  authService = inject(AuthService);
  router = inject(Router);
  form = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  isPasswordVisible = signal<boolean>(false);
  loginSub!: Subscription

  onSubmit() {
    if (this.form.valid) {
      // @ts-ignore
      this.loginSub = this.authService.login(this.form.value).subscribe((res) => {
        this.router.navigate(['']);
      });
    }
  }

  ngOnDestroy() {
    this.loginSub.unsubscribe()
  }
}
