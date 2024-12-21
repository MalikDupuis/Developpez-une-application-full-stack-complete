import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { filter, Observable } from 'rxjs';
import { SessionInformation } from '../../interfaces/sessionInformation.interface';
import { Theme } from '../../interfaces/theme.interface';
import { SubscriptionService } from '../../services/subscription.service';
import { SessionService } from '../../services/session.service';
import { SubscriptionRequest } from '../../interfaces/subscriptionRequest.interface';
import { ThemeComponent } from '../../components/theme/theme.component';

@Component({
  selector: 'app-themes',
  standalone: true,
  imports: [ThemeComponent, CommonModule],
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent implements OnInit {
  private userId!: number;

  themes: Theme[] = [
    { id: 1, title: "Développement logiciel", description: 'Découvrez les technologies et frameworks les plus récents comme Angular, React ou Vue.js, pour créer des applications web rapides et performantes.' },
    { id: 2, title: "Intelligence artificielle et apprentissage automatique", description: 'Introduction à l\'IA' },
    { id: 3, title: "Sécurité informatique", description: 'Introduction à l\'IA' },
    { id: 4, title: "Développement mobile", description: 'Introduction à l\'IA' },
    { id: 5, title: "Programmation avancée", description: 'Introduction à l\'IA' },
    { id: 6, title: "Technologies émergentes", description: 'Introduction à l\'IA' },
    { id: 7, title: "Gestion de projet et DevOps", description: 'Introduction à l\'IA' }
  ];

  public sessionInformation$: Observable<SessionInformation | null>;
  public subscriptionRequest!: SubscriptionRequest; // Déclaration sans valeur initiale

  constructor(
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
            theme: '', // Valeur par défaut ou à définir plus tard
            userId: this.userId
          };
          console.log('Valeur de sessionInformation$', sessionInfo);
        }
      });
  }

  // Cette méthode est appelée pour sélectionner un thème
  selectTheme(title: string) {
    // Mettre à jour le thème sélectionné dans subscriptionRequest
    this.subscriptionRequest.theme = title;

    // Appeler la méthode pour s'abonner au thème
    this.subscribe();
  }

  // Méthode pour envoyer la demande d'abonnement
  subscribe() {
    if (this.subscriptionRequest.theme) {
      this.subscriptionService.subscribe(this.subscriptionRequest).subscribe({
        next: () => console.log('Participation réussie'),
        error: (err) => console.error('Erreur lors de la participation', err),
      });
    } else {
      console.error("Le thème n'est pas sélectionné.");
    }
  }
}
