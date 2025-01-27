import { Component, inject, OnInit } from '@angular/core';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { Article } from '../../interfaces/article.interface';
import { ArticleService } from '../../services/articles.service';
import { CommentService } from '../../services/comment.service';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { ArticleComponent } from "../../components/article/article.component";
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Comments } from '../../interfaces/comments.interface';
import { SessionInformation } from '../../interfaces/sessionInformation.interface';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-article-detail',
  standalone:true,
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
  imports: [ArticleComponent, CommonModule, MatIconModule, RouterLink, FormsModule]
})
export class ArticleDetailComponent implements OnInit {

  public sessionInformation$: Observable<SessionInformation | null>;
  private articleSubject = new BehaviorSubject<Article | null>(null);
public article$ = this.articleSubject.asObservable();
  public newCommentContent = '';
  private route = inject(ActivatedRoute);
  public comment: Comments = { // Initialisez correctement l'objet comment
    articleId: -1,
    content: '',
    authorId: -1,
  };

  constructor(private sessionService: SessionService,
    private articlesService: ArticleService,
    private commentService: CommentService
  ) { 
    this.sessionInformation$ = this.sessionService.sessionInformation$;
  }

  ngOnInit() {
    this.sessionInformation$
              .pipe(filter((sessionInfo) => sessionInfo !== null)) // Filtrer pour ignorer les valeurs nulles
              .subscribe((sessionInfo) => {
                if (sessionInfo) {
                  
                  this.route.params.subscribe((params) => {
                    this.articlesService.getById(params['articleId']).subscribe((article) => {
                      this.comment.articleId = params['articleId'];
                      this.comment.author = sessionInfo.nom;
                      this.comment.authorId = sessionInfo.userId;
                      this.articleSubject.next(article);
                    });
                  });

                }
              });
    
  }
  
    
  

  public addComment(): void {
    console.log('addComment');
    this.comment.content = this.newCommentContent;
  
    console.log(this.newCommentContent);
  
    this.commentService.newComment(this.comment).subscribe({
      next: () => {
        const currentArticle = this.articleSubject.value;
  
        if (currentArticle) {
          currentArticle.comments = currentArticle.comments || [];
          currentArticle.comments.push(this.comment);
          this.articleSubject.next(currentArticle); // Réémettre l'article mis à jour
        }
  
        this.newCommentContent = '';
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout du commentaire :', err);
      },
    });
  }
  

  

}
