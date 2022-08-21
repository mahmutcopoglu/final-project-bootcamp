import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppMainComponent } from './app-main.component';
import { LoginComponent } from './pages/login/components/login/login.component';
import { RegisterComponent } from './pages/register/components/register/register.component';
import { AuthGuard } from './security/guards/auth.guard';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    {
      path: '',
      canActivate: [AuthGuard],
      component: AppMainComponent,
      children: [
        {
          path: '',
          loadChildren: () =>
            import('../app/pages/home/home.module').then(
              (m) => m.HomeModule
            )
        },
        {
          path: 'account',
          loadChildren: () =>
            import('../app/pages/account-detail/account-detail.module').then(
              (m) => m.AccountDetailModule
            )
        },
        {
          path: 'accounts',
          loadChildren: () =>
            import('../app/pages/accounts/accounts.module').then(
              (m) => m.AccountsModule
            )
        },
        {
          path: 'users',
          loadChildren: () =>
            import('../app/pages/users/users.module').then(
              (m) => m.UsersModule
            )
        },
        {
          path: 'banks',
          loadChildren: () =>
            import('../app/pages/banks/banks.module').then(
              (m) => m.BanksModule
            )
        },
        {
          path: 'profile',
          loadChildren: () =>
            import('../app/pages/profile/profile.module').then(
              (m) => m.ProfileModule
            )
        }
    ]

    },
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
