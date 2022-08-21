import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountsComponent } from "./components/accounts/accounts.component";
import { AllAccountsComponent } from "./components/all-accounts/all-accounts.component";
import { NewAccountComponent } from "./components/new-account/new-account.component";

const routes: Routes = [
    {path: '', component: AccountsComponent},
    {path: 'new-account', component: NewAccountComponent},
    {path: 'all', component: AllAccountsComponent},
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountsRoutingModule {}
