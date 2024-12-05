import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastService } from '../../../core/services/toast.service';
import { LogoHeaderComponent } from '../../../shared/components/logo-header/logo-header.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    LogoHeaderComponent,
    RouterModule,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form: FormGroup;
  submitted = false;
  passwordTextType = false;

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  async onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      this.toastService.show(
        'Erro',
        'Preencha todos os campos corretamente.',
        'error'
      );
      return;
    }

    try {
      const { email, password } = this.form.value;
      const user = await this.authService.login(email, password);

      if (user) {
        this.toastService.show(
          'Sucesso',
          'Login realizado com sucesso!',
          'success'
        );

        this.router.navigate(['/dashboard']);
      }
    } catch (error) {
      this.toastService.show(
        'Erro',
        'Credenciais inválidas ou problemas no servidor.',
        'error'
      );
      console.error('Erro ao fazer login:', error);
    }
  }
}
