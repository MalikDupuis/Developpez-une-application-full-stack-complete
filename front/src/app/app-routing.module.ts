import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { ThemesComponent } from './pages/themes/themes.component';
import { CreateArticleComponent } from './pages/create-article/create-article.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { ArticleDetailComponent } from './pages/article-detail/article-detail.component';
import { UnauthGuard } from './guards/unauth.guard';
import { AuthGuard } from './guards/auth.guard';

// consider a guard combined with canLoad / canActivate route option
// to manage unauthenticated user to access private routes
const routes: Routes = [
  { path: '', component: HomeComponent , canActivate: [UnauthGuard]},
  { path: 'login', component: LoginComponent , canActivate: [UnauthGuard]},
  { path: 'register', component: RegisterComponent , canActivate: [UnauthGuard]},
  { path: 'articleDetail', component: ArticleDetailComponent , canActivate: [AuthGuard]},
  { path: 'articles', component: ArticlesComponent , canActivate: [AuthGuard]},
  { path: 'createArticle', component: CreateArticleComponent , canActivate: [AuthGuard]},
  { path: 'theme', component: ThemesComponent , canActivate: [AuthGuard]},
  { path: 'profil', component: ProfilComponent , canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
