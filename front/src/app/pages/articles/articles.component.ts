import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/interfaces/article.interface';
import { ArticleService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  public articles$!: Observable<Article[]> | null;

  constructor(private articlesService: ArticleService) { }

  ngOnInit(): void {
    this.articles$ = this.articlesService.getAll(12);
  }

}
