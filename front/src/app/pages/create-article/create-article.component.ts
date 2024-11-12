import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleRequest } from 'src/app/interfaces/articleRequest.interface';
import { ArticleService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {

  public errorMessage = "";

  public form = this.fb.group({
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

  constructor(private articleService: ArticleService,
    private fb: FormBuilder,
    private router: Router) {
}

public submit(): void {
  const articleRequest = this.form.value as ArticleRequest;
  this.articleService.create(articleRequest).subscribe({
    next: () => {
      this.router.navigate(['/']);
    },
    error: error => this.errorMessage = error.error.message,
  });
}

  ngOnInit(): void {
  }

}
