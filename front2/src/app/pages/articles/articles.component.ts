import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../../interfaces/article.interface';
import { ArticleService } from '../../services/articles.service';
import { ArticleComponent } from '../../components/article/article.component';

@Component({
  selector: 'app-articles',
  standalone:true,
  imports:[ArticleComponent],
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
