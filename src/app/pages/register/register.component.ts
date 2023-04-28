import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, switchMap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.createForm();
  }

  onSubmit(): void {
    if (!this.registrationForm.valid) {
      return;
    }
    const user: User = {
      id: 0,
      fullName: this.registrationForm.value.fullName,
      login: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
      email: this.registrationForm.value.email,
    };
    this.userService
      .getUserByEmail(user.email)
      .pipe(
        switchMap((existingUser: User) => {
          if (existingUser) {
            return throwError(`User with email ${existingUser.email} already exists`);
          } else {
            return this.userService.postUser(user);
          }
        }),
        catchError((error: Error) => {
          console.error(error);
          alert(`Error: ${error.message}`);
          return of(null);
        })
      )
      .subscribe((newUser: User | null) => {
        if (newUser) {
          alert(`User ${newUser.fullName} registered successfully`);
          this.router.navigate(['/login']).then(r => console.log(r));
        }
      });
  }

  private createForm(): void {
    this.registrationForm = this.formBuilder.group(
      {
        fullName: ['', [Validators.required, Validators.minLength(6)]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        agreeTerms: [false, Validators.requiredTrue],
      },
      { validators: [this.matchConfirmPassword] }
    );
  }

  private matchConfirmPassword(control: FormGroup): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value ? { passwordMismatch: true } : null;
  }
}
