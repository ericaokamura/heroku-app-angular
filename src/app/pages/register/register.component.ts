import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registrationForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.createForm();
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) {
      return;
    }
    const user: User = {
      fullName: this.registrationForm.value.fullName,
      email: this.registrationForm.value.email,
      login: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
    };
    alert('User registered successfully');
    // this.userService.postUser(user).subscribe(() => {
    //   alert('User registered successfully');
    //   this.registrationForm.reset();
    // });
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
        confirmPassword: ['', [Validators.required, this.matchConfirmPassword.bind(this)]],
        agreeTerms: [false],
      },
      { validators: [this.matchConfirmPassword, Validators.requiredTrue] }
    );
  }

  private matchConfirmPassword(control: FormGroup): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value ? { passwordMismatch: true } : null;
  }
}
