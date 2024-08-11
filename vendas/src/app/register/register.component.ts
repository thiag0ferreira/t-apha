import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerData = { name: '', taxNumber: '', mail: '', phone: '', password: '' };
  errorMessage: string | null = null;

  constructor(private authService: AuthService) {}

  onRegister() {
    this.authService.register(this.registerData).subscribe(response => {
      console.log('Registration successful', response);
      this.errorMessage = null;  // Limpa a mensagem de erro se o registro for bem-sucedido
      // Redirecionar ou mostrar mensagem de sucesso
    }, error => {
      console.error('Registration failed', error);
      if (error.status === 400) {
        this.errorMessage = 'Usuário já cadastrado. Tente novamente com um email ou CPF diferente.';
            }
    });
  }
}
