import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../../interfaces/article.interface';
import { ArticleService } from '../../services/articles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleComponent } from "../../components/article/article.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-detail',
  standalone:true,
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
  imports: [ArticleComponent, CommonModule]
})
export class ArticleDetailComponent implements OnInit {

  public article$!: Observable<Article> | null;
 

  constructor(private articlesService: ArticleService) { }

  ngOnInit() {
    this.article$ = this.articlesService.getById("1");
  }



  

}
