import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountDetailComponent } from "./components/account-detail/account-detail.component";

const routes: Routes = [
    {path: ':id', component: AccountDetailComponent}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountDetailRoutingModule {}
