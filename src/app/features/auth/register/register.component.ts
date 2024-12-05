import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LogoHeaderComponent } from '../../../shared/components/logo-header/logo-header.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    LogoHeaderComponent,
    RouterModule,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  form: FormGroup;
  submitted = false;

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
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
      const { name, email, password } = this.form.value;
      const user = await this.authService.register(name, email, password);

      if (user) {
        this.toastService.show(
          'Sucesso',
          'Conta criada com sucesso! Redirecionando...',
          'success'
        );
        this.router.navigate(['/auth/login']);
      }
    } catch (error) {
      this.toastService.show(
        'Erro',
        'Erro ao criar conta. Por favor, tente novamente mais tarde.',
        'error'
      );
      console.error('Erro ao cadastrar usuário:', error);
    }
  }
}
