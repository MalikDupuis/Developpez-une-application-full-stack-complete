import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { filter, Observable } from 'rxjs';
import { SessionInformation } from '../../interfaces/sessionInformation.interface';
import { Theme } from '../../interfaces/theme.interface';
import { SubscriptionService } from '../../services/subscription.service';
import { SessionService } from '../../services/session.service';
import { SubscriptionRequest } from '../../interfaces/subscriptionRequest.interface';
import { ThemeComponent } from '../../components/theme/theme.component';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-themes',
  standalone: true,
  imports: [ThemeComponent, CommonModule],
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent implements OnInit {
  private userId!: number;
  public themes$!: Observable<Theme[]> | null;

  

  public sessionInformation$: Observable<SessionInformation | null>;
  public subscriptionRequest!: SubscriptionRequest; // Déclaration sans valeur initiale

  constructor(
    private themeService: ThemeService,
    private sessionService: SessionService,
    private subscriptionService: SubscriptionService
  ) {
    this.sessionInformation$ = this.sessionService.sessionInformation$;
  }

  ngOnInit(): void {
    this.sessionInformation$
      .pipe(filter((sessionInfo) => sessionInfo !== null)) // Filtrer pour ignorer les valeurs nulles
      .subscribe((sessionInfo) => {
        if (sessionInfo) {
          // Mettre à jour l'ID utilisateur et initialiser subscriptionRequest
          this.userId = sessionInfo.userId;
          this.subscriptionRequest = {
            themeId: -1, // Valeur par défaut ou à définir plus tard
            userId: this.userId
          };
          this.themes$ = this.themeService.getAll(this.userId);
        }
      });
  }

  // Cette méthode est appelée pour sélectionner un thème
  selectTheme(id: number) {
    // Mettre à jour le thème sélectionné dans subscriptionRequest
    console.log(id)
    this.subscriptionRequest.themeId = id;

    // Appeler la méthode pour s'abonner au thème
    this.subscribe();
  }

  // Méthode pour envoyer la demande d'abonnement
  subscribe() {
    if (this.subscriptionRequest.themeId != -1) {
      this.subscriptionService.subscribe(this.subscriptionRequest).subscribe({
        next: () => console.log('Participation réussie'),
        error: (err) => console.error('Erreur lors de la participation', err),
      });
    } else {
      console.error("Le thème n'est pas sélectionné.");
    }
  }
}
