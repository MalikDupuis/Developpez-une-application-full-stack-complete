import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionInformation } from 'src/app/interfaces/sessionInformation.interface';
import { Theme } from 'src/app/interfaces/theme.interface';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { SessionService } from 'src/app/services/session.service';
import { SubscriptionRequest } from 'src/app/interfaces/subscriptionRequest.interface';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent implements OnInit {

   themes: Theme[] = [
    { id:1, title: "Développement logiciel", description: 'Découvrez les technologies et frameworks les plus récents comme Angular, React ou Vue.js, pour créer des applications web rapides et performantes.' },
    { id: 2, title: "Intelligence artificielle et apprentissage automatique", description: 'Introduction à l\'IA' },
    { id: 3, title: "Sécurité informatique", description: 'Introduction à l\'IA' },
    { id: 4, title: "Développement mobile", description: 'Introduction à l\'IA' },
    { id: 5, title: "Programmation avancée", description: 'Introduction à l\'IA' },
    { id: 6, title: "Technologies émergentes", description: 'Introduction à l\'IA' },
    { id: 7, title: "Gestion de projet et DevOps", description: 'Introduction à l\'IA' }
  ];
  
  public sessionInformation$: Observable<SessionInformation | null>;
  public subscriptionRequest: SubscriptionRequest = {
    theme: 'Développement logiciel',
    userId: 1
  };
  
  constructor(private sessionService: SessionService,
              private subscriptionService: SubscriptionService
  ) { 
    this.sessionInformation$ = this.sessionService.sessionInformation$;
  }

  ngOnInit(): void {
    this.sessionInformation$.subscribe((sessionInfo) => {
      console.log('Valeur de sessionInformation$', sessionInfo);
    });
  }

  subscribe(title: string) {
    
        
        
          this.subscriptionService.subscribe(this.subscriptionRequest).subscribe({
            next: () => console.log('Participation réussie'),
            error: (err) => console.error('Erreur lors de la participation', err),
          });
        
      
  }
  

}
