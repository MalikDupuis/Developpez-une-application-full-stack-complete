import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegisterRequest } from '../../interfaces/registerRequest.interface';
import { SessionInformation } from '../../interfaces/sessionInformation.interface';
import { TokenRequest } from '../../interfaces/tokenRequest.interface';
import { AuthService } from '../../services/auth.service';
import { SessionService } from '../../services/session.service';
import { MatFormFieldModule} from '@angular/material/form-field';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-register',
  standalone:true,
  imports:[MatFormFieldModule,ErrorMessageComponent,CommonModule, ReactiveFormsModule, MatInputModule, MatIconModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  

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
}

  

  
  ngOnInit(): void {
    
  }

  public form;

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
