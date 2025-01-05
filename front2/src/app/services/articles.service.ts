import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { ArticleRequest } from '../interfaces/articleRequest.interface';
import { Article } from '../interfaces/article.interface';
import { MessageResponse } from '../interfaces/messageResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private pathService = 'api/article';

  constructor(private httpClient: HttpClient) {
  }

  public create(articleRequest: ArticleRequest): Observable<MessageResponse> {
    return this.httpClient.post<MessageResponse>(this.pathService, articleRequest);
  }

  public getById(articleId: string): Observable<Article> {
    console.log(articleId)
    return this.httpClient.get<Article>(`${this.pathService}/detail/${articleId}`);
  }

  public getAll(userId: number): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${this.pathService}/${userId}`);
  }

}
