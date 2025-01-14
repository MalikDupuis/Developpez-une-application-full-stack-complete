import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule} from '@angular/material/form-field';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ProfilRequest } from '../../interfaces/profilRequest.interface';
import { MessageResponse } from '../../interfaces/messageResponse.interface';
import { MatInputModule } from '@angular/material/input';
import { filter, Observable } from 'rxjs';
import { SessionInformation } from '../../interfaces/sessionInformation.interface';
import { SessionService } from '../../services/session.service';
import { CommonModule } from '@angular/common';
import { SubscriptionComponent } from "../../components/subscription/subscription.component";
import { Theme } from '../../interfaces/theme.interface';
import { SubscriptionService } from '../../services/subscription.service';
import { SubscriptionResponse } from '../../interfaces/SubscriptionResponse.interface';
import { SubscriptionRequest } from '../../interfaces/subscriptionRequest.interface';

@Component({
  selector: 'app-profil',
  imports: [MatFormFieldModule, ErrorMessageComponent, ReactiveFormsModule, MatInputModule, CommonModule, SubscriptionComponent],
  standalone:true,
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {


  public themes$!: Observable<SubscriptionResponse[]> | null;
  private userId!: number;
  public errorMessage = "";
  public sessionInformation$: Observable<SessionInformation | null>;
  
    constructor(private userService: UserService,
      private fb: FormBuilder,
      private router: Router,
      private sessionService: SessionService,
    private subscriptionService: SubscriptionService) {
        this.sessionInformation$ = this.sessionService.sessionInformation$;
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
              Validators.required
            ]
          ]
        });
  }
  
    
  logout() {
    this.sessionService.logOut();
    this.router.navigate(['/login']);
    }
    
    
  
    ngOnInit(): void {
      this.sessionInformation$
            .pipe(filter((sessionInfo) => sessionInfo !== null)) // Filtrer pour ignorer les valeurs nulles
            .subscribe((sessionInfo) => {
              if (sessionInfo) {
                // Mettre à jour l'ID utilisateur et initialiser subscriptionRequest
                this.userId = sessionInfo.userId;
                this.themes$ = this.subscriptionService.getMy(this.userId);
                
              }
            });

            
    }
  
    public form;
  
    public submit(): void {
      const profilRequest = this.form.value as ProfilRequest;
      profilRequest.userId = this.userId;
      this.userService.update(profilRequest).subscribe({
        next: (response: MessageResponse) => {
          alert(response.message)
        },
        error: error => {
          this.errorMessage = error?.error?.message || 'Une erreur est survenue lors du changement.';
        }
      });
    }


    // Cette méthode est appelée pour sélectionner un thème
  selectTheme(subscriptionId: number) {
    console.log("select" + subscriptionId)
    this.unSubscribe(subscriptionId);
  }

  // Méthode pour envoyer la demande d'abonnement
  unSubscribe(subscriptionId: number) {
    
      this.subscriptionService.unSubscribe(subscriptionId).subscribe({
        next: () => window.location.reload(),
        error: (err) => console.error('Erreur lors de la participation', err),
      });
    
  }

}
