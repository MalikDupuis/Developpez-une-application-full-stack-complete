import { Component, OnInit,ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleRequest } from '../../interfaces/articleRequest.interface';
import { ArticleService } from '../../services/articles.service';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { filter, Observable } from 'rxjs';
import { SessionInformation } from '../../interfaces/sessionInformation.interface';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-create-article',
  standalone:true,
  imports: [ErrorMessageComponent, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatSelectModule],  // Déclarer les imports
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CreateArticleComponent implements OnInit {
  public errorMessage = "";
  public sessionInformation$: Observable<SessionInformation | null>;
  private nom!: string;

  constructor(
    private articleService: ArticleService,
    private fb: FormBuilder,
    private router: Router,
    private sessionService: SessionService
  ) {
    this.sessionInformation$ = this.sessionService.sessionInformation$;
    // Initialisez le formulaire dans le constructeur si nécessaire
    this.form = this.fb.group({
      title: [
        '',
        [
          Validators.required
        ]
      ],
      content: [
        '',
        [
          Validators.required
        ]
      ],
      themeId: [
        0,
        [
          Validators.required
        ]
      ]
    });
  }

  ngOnInit(): void {
    this.sessionInformation$
          .pipe(filter((sessionInfo) => sessionInfo !== null)) // Filtrer pour ignorer les valeurs nulles
          .subscribe((sessionInfo) => {
            if (sessionInfo) {
              // Mettre à jour l'ID utilisateur et initialiser subscriptionRequest
              this.nom = sessionInfo.nom;
            }
          });
  }

  public form;

  public submit(): void {
    if (this.form.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs correctement.';
      return;
    }
    const articleRequest = this.form.value as ArticleRequest;
    articleRequest.author = this.nom;
    this.articleService.create(articleRequest).subscribe({
      next: (response) => {
        alert(response.message);
        this.router.navigate(['/articles']);
      },
      error: (error) => {
        this.errorMessage = error?.error?.message || 'Une erreur est survenue lors de la création dun article.';
      },
    });
  }
}

