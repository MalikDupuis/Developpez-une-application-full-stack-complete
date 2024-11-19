import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HeaderComponent } from './header/header.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { ThemeComponent } from './pages/theme/theme.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { CreateArticleComponent } from './pages/create-article/create-article.component';
import { ArticleDetailComponent } from './pages/article-detail/article-detail.component';
import { ArticleComponent } from './components/article/article.component';

import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

@NgModule({
  declarations: [AppComponent, HomeComponent, LoginComponent, RegisterComponent, HeaderComponent, ErrorMessageComponent, ArticlesComponent, ThemeComponent, ProfilComponent, CreateArticleComponent, ArticleDetailComponent, ArticleComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressBarModule,
    MatCardModule,
    MatChipsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },],
  bootstrap: [AppComponent],
})
export class AppModule {}
