import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registrationForm: FormGroup;
  private userService: UserService;

  constructor(private formBuilder: FormBuilder, userService: UserService) {
    this.userService = userService;
    this.registrationForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.[a-z])(?=.[A-Z])(?=.*d)[a-zA-Zd]{8,}$')]],
      confirmPassword: ['', [Validators.required, this.matchConfirmPassword.bind(this)]],
      agreeTerms: [false, Validators.requiredTrue],
    });
  }

  matchConfirmPassword(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value ? { passwordMismatch: true } : null;
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
    this.userService.postUser(user).subscribe(
      () => {
        alert('Usuário criado com sucesso!');
        this.registrationForm.reset();
      },
      error => {
        console.error(error);
        alert('Ocorreu um erro ao criar o usuário.');
      }
    );
  }
}
