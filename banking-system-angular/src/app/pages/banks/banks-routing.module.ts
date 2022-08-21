import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BanksComponent } from "./components/banks/banks.component";
import { NewBankComponent } from "./components/new-bank/new-bank.component";

const routes: Routes = [
    {path: '', component: BanksComponent},
    {path: 'new-bank', component: NewBankComponent},
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BanksRoutingModule {}
