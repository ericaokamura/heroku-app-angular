import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.createForm();
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email: string = this.loginForm.controls['email'].value;
      this.userService.getUserByEmail(email).subscribe((user: User) => {
        if (user && user.password === this.loginForm.controls['password'].value) {
          alert(`User ${user.fullName} logged in successfully`);
          this.router.navigate(['/']).then(r => console.log(r));
        } else {
          alert('Invalid email or password');
        }
      });
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
}
