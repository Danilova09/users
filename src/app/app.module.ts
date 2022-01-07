import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './app-not-found.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SaveUserComponent } from './save-user/save-user.component';
import { UsersComponent } from './home/users/users.component';
import { FormsModule } from '@angular/forms';
import { RegisteredComponent } from './app-registered.component';
import { HttpClientModule } from '@angular/common/http';
import { UserItemComponent } from './home/users/user-item/user-item.component';
import { ValidatePhoneDirective } from './validate-phone.directive';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SaveUserComponent,
    UsersComponent,
    RegisteredComponent,
    NotFoundComponent,
    UserItemComponent,
    ValidatePhoneDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
