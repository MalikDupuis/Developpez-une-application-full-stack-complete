import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../../interfaces/article.interface';
import { ArticleService } from '../../services/articles.service';
import { RouterLink, Router } from '@angular/router';
import { ArticleComponent } from "../../components/article/article.component";
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-article-detail',
  standalone:true,
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
  imports: [ArticleComponent, CommonModule, MatIconModule, RouterLink]
})
export class ArticleDetailComponent implements OnInit {

  public article$!: Observable<Article> | null;
  public newCommentContent = '';

  constructor(private articlesService: ArticleService) { }

  ngOnInit() {
    this.article$ = this.articlesService.getById("7");
  }

  public addComment(): void {
    
  }

  

}
