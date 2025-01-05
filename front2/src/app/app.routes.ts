import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ArticleDetailComponent } from './pages/article-detail/article-detail.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { CreateArticleComponent } from './pages/create-article/create-article.component';
import { ThemesComponent } from './pages/themes/themes.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { UnauthGuard } from './guards/unauth.guard';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'articleDetail/:articleId', component: ArticleDetailComponent },
    { path: 'articles', component: ArticlesComponent},
    { path: 'createArticle', component: CreateArticleComponent },
    { path: 'theme', component: ThemesComponent },
    { path: 'profil', component: ProfilComponent},
  ];
