import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { ArticleRequest } from '../interfaces/articleRequest.interface';
import { Article } from '../interfaces/article.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private pathService = 'api/article';

  constructor(private httpClient: HttpClient) {
  }

  public create(articleRequest: ArticleRequest): Observable<any> {
    return this.httpClient.post<User>(this.pathService, articleRequest);
  }

  public getAll(userId: number): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${this.pathService}/${userId}`);
  }




  public getById(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.pathService}/${id}`);
  }

  public detail(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.pathService}/${id}`);
  }

  public update(id: string, session: User): Observable<User> {
    return this.httpClient.put<User>(`${this.pathService}/${id}`, session);
  }

  public participate(id: string, userId: string): Observable<void> {
    return this.httpClient.post<void>(`${this.pathService}/${id}/participate/${userId}`, null);
  }

  public unParticipate(id: string, userId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.pathService}/${id}/participate/${userId}`);
  }

}
