import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { ArticleRequest } from '../interfaces/articleRequest.interface';
import { Article } from '../interfaces/article.interface';
import { MessageResponse } from '../interfaces/messageResponse.interface';
import { Comments } from '../interfaces/comments.interface';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private pathService = 'api/comment';

  constructor(private httpClient: HttpClient) {
  }

public newComment(comments: Comments): Observable<MessageResponse> {
    return this.httpClient.post<MessageResponse>("/"+this.pathService, comments);
  }
}