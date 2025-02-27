import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterRequest } from 'src/app/interfaces/registerRequest.interface';
import { SessionInformation } from 'src/app/interfaces/sessionInformation.interface';
import { TokenRequest } from 'src/app/interfaces/tokenRequest.interface';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public errorMessage = "";

  public form = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],
    nom: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]
    ],
    
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40)
      ]
    ]
  });

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router,
              private sessionService: SessionService) {
  }
  ngOnInit(): void {
    
  }

  public submit(): void {
    const registerRequest = this.form.value as RegisterRequest;
    this.authService.register(registerRequest).subscribe({
      next: (response: TokenRequest) => {
        this.sessionService.logIn(response);
        this.router.navigate(['/']);
      },
      error: error => {
  this.errorMessage = error?.error?.message || 'Une erreur est survenue lors de l’inscription.';
}
      }
    );
  }

}
