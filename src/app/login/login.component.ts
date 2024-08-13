import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {taxNumber: '', password: ''};
  resposta: any;

  constructor(private authService: AuthService, private router: Router) {
  }

  onLogin() {
    this.authService.login(this.loginData).subscribe(response => {
      console.log('Login successful, response:', response); // Verifique a resposta no console
      this.resposta = response.data;
      if (this.resposta.token) {
        this.authService.saveToken(this.resposta.token);
        this.router.navigate(['/products'] );  // Redireciona para a página de produtos após o login
      } else {
        console.error('Token não encontrado na resposta do login.');
      }
    }, error => {
      console.error('Login falhou', error);
    });
  }
}
