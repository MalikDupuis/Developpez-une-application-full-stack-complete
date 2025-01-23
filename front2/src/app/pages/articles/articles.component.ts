import { Component, OnInit } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { Article } from '../../interfaces/article.interface';
import { ArticleService } from '../../services/articles.service';
import { ArticleComponent } from '../../components/article/article.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SessionInformation } from '../../interfaces/sessionInformation.interface';
import { SessionService } from '../../services/session.service';


@Component({
  selector: 'app-articles',
  standalone:true,
  imports:[ArticleComponent,CommonModule],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  public articles$!: Observable<Article[]> ;
  public sessionInformation$: Observable<SessionInformation | null>;

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

  redirectToCreateAnArticle() {
    this.router.navigate(['/createArticle']);
  }

  navigateToArticleDetail(articleId: number) {
    this.router.navigate(['/articleDetail', articleId]);
  }

}
