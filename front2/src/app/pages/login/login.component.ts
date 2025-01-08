import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from '../../interfaces/loginRequest.interface';
import { TokenRequest } from '../../interfaces/tokenRequest.interface';
import { AuthService } from '../../services/auth.service';
import { SessionService } from '../../services/session.service';
import { MatFormFieldModule} from '@angular/material/form-field';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone:true,
  imports:[MatFormFieldModule,ErrorMessageComponent, ReactiveFormsModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public errorMessage = "";

  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private sessionService: SessionService) {
      this.form = this.fb.group({
        email: [
          '',
          [
            Validators.required,
            Validators.email
          ]
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(3)
          ]
        ]
      });
}

  

  
  

  ngOnInit(): void {
  }

  public form;

  public submit(): void {
    const loginRequest = this.form.value as LoginRequest;
    this.authService.login(loginRequest).subscribe({
      next: (response: TokenRequest) => {
        this.sessionService.logIn(response);
        this.router.navigate(['/articles']);
      },
      error: error => {
        this.errorMessage = error?.error?.message || 'Une erreur est survenue lors de la connexion.';
      }
    });
  }

}
