import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  user!: User;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.createForm();
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.validateUser();
    }
  }

  private createForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
        ],
      ],
    });
  }

  private validateUser(): void {
    const email = this.loginForm.get('email')!.value;

    this.userService
      .getUserByEmail(email)
      .pipe(
        tap((user: User) => {
          if (user && user.senha === this.loginForm.get('password')!.value) {
            this.user = user;
          } else {
            throw new Error('Invalid email or password');
          }
        }),
        catchError((error: any) => {
          console.error(error);
          return throwError(error);
        })
      )
      .subscribe(() => {
        alert(`User ${this.user.nomeCompleto} logged in successfully`);
        this.router.navigate(['/']).then(() => {
          this.loginForm.reset();
        });
      });
  }
}
