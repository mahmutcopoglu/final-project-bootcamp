import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AppMainComponent } from './app-main.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './pages/login/login.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {ToastModule} from 'primeng/toast';
import { StyleClassModule } from 'primeng/styleclass';
import { SharedModule } from 'primeng/api';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { TabViewModule } from 'primeng/tabview';
import { HomeModule } from './pages/home/home.module';
import { AuthenticationInterceptorService } from './security/interceptors/auth.interceptor';
import { CommonModule } from '@angular/common';
import { AccountDetailModule } from './pages/account-detail/account-detail.module';
import { AccountsModule } from './pages/accounts/accounts.module';
import { UsersModule } from './pages/users/users.module';
import { BanksModule } from './pages/banks/banks.module';
import { ProfileModule } from './pages/profile/profile.module';

@NgModule({
  declarations: [
    AppComponent,
    AppMainComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    LoginModule,
    BrowserAnimationsModule,
    ButtonModule,
    StyleClassModule,
    RippleModule,
    TabViewModule,
    FormsModule,
    ToastModule,
    SharedModule,
    HomeModule,
    AccountDetailModule,
    AccountsModule,
    UsersModule,
    BanksModule,
    ProfileModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptorService, multi:true},
],
  bootstrap: [AppComponent]
})
export class AppModule { }
