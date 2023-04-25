import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.registrationForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.[a-z])(?=.[A-Z])(?=.*d)[a-zA-Zd]{8,}$')]],
      confirmPassword: ['', [Validators.required, this.matchConfirmPassword.bind(this)]],
      agreeTerms: [false, Validators.requiredTrue],
    });
  }

  matchConfirmPassword(control: AbstractControl) {
    const password = control.root.get('password');
    return password && control.value !== password.value ? { matchConfirmPassword: true } : null;
  }
}
