import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../../interfaces/article.interface';
import { ArticleService } from '../../services/articles.service';
import { ArticleComponent } from '../../components/article/article.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-articles',
  standalone:true,
  imports:[ArticleComponent,CommonModule],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  public articles$!: Observable<Article[]> | null;

  constructor(private articlesService: ArticleService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.articles$ = this.articlesService.getAll(21);
  }

  redirectToCreateAnArticle() {
    this.router.navigate(['/createArticle']);
  }

}
