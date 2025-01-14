import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { ArticleRequest } from '../interfaces/articleRequest.interface';
import { Article } from '../interfaces/article.interface';
import { MessageResponse } from '../interfaces/messageResponse.interface';
import { Theme } from '../interfaces/theme.interface';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private pathService = 'api/theme';

  constructor(private httpClient: HttpClient) {
  }

  public getAll(userId: number): Observable<Theme[]> {
    return this.httpClient.get<Theme[]>(`${this.pathService}/${userId}`);
  }

}
