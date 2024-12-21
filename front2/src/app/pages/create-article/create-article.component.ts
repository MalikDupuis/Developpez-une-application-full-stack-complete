import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleRequest } from '../../interfaces/articleRequest.interface';
import { ArticleService } from '../../services/articles.service';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-article',
  standalone:true,
  imports: [ErrorMessageComponent, MatFormFieldModule, ReactiveFormsModule],  // Déclarer les imports
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {
  public errorMessage = "";

  constructor(
    private articleService: ArticleService,
    private fb: FormBuilder,
    private router: Router
  ) {
    // Initialisez le formulaire dans le constructeur si nécessaire
    this.form = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      content: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],
      theme: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ]
    });
  }

  ngOnInit(): void {}

  public form;

  public submit(): void {
    const articleRequest = this.form.value as ArticleRequest;
    this.articleService.create(articleRequest).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorMessage = error.error.message;
      },
    });
  }
}

