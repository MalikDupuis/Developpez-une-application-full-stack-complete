import { Component, OnInit } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { Article } from '../../interfaces/article.interface';
import { ArticleService } from '../../services/articles.service';
import { ArticleComponent } from '../../components/article/article.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SessionInformation } from '../../interfaces/sessionInformation.interface';
import { SessionService } from '../../services/session.service';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-articles',
  standalone:true,
  imports:[ArticleComponent,CommonModule, MatIconModule],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  public articles$!: Observable<Article[]> ;
  public sessionInformation$: Observable<SessionInformation | null>;
  public sortDescending: boolean = true;


  constructor(
    private sessionService: SessionService,
    private articlesService: ArticleService,
    private router: Router
  ) {
    this.sessionInformation$ = this.sessionService.sessionInformation$;
   }
  ngOnInit(): void {
    this.sessionInformation$
          .pipe(filter((sessionInfo) => sessionInfo !== null)) // Filtrer pour ignorer les valeurs nulles
          .subscribe((sessionInfo) => {
            if (sessionInfo) {
              
              this.articles$ = this.articlesService.getAll(sessionInfo.userId);
              console.log('Valeur de sessionInformation$', sessionInfo);
            }
          });
    
    
  }

  sortArticlesByDate() {
    this.articles$ = this.articles$.pipe(
      map((articles) =>
        articles.sort((a, b) =>
          this.sortDescending
            ? new Date(b.created).getTime() - new Date(a.created).getTime()
            : new Date(a.created).getTime() - new Date(b.created).getTime()
        )
      )
    );
    this.sortDescending = !this.sortDescending;
  }

  redirectToCreateAnArticle() {
    this.router.navigate(['/createArticle']);
  }

  navigateToArticleDetail(articleId: number) {
    this.router.navigate(['/articleDetail', articleId]);
  }

}
