import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './app-not-found.component';
import { HomeComponent } from './home/home.component';
import { SaveUserComponent } from './home/save-user/save-user.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path: '', component: HomeComponent, children: [
      {path: '', component: SaveUserComponent},
    ]},
  {path: 'users', component: UsersComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
