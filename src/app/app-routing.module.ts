import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './app-not-found.component';
import { HomeComponent } from './home/home.component';
import { SaveUserComponent } from './save-user/save-user.component';
import { RegisteredComponent } from './app-registered.component';
import { UserResolverService } from './save-user/user-resolver.service';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users/new', component: SaveUserComponent},
  {path: 'users/:id/edit', component: SaveUserComponent, resolve: {user: UserResolverService}},
  {path: 'registered', component: RegisteredComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
