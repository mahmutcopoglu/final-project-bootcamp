import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountsService } from '../../services/accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  accounts: any = []
  constructor(private accountsService: AccountsService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAccounts()
  }

  getAccounts(){
    this.accountsService.getAccounts().subscribe((response: any) => {
      this.accounts = response.data;
    })
  }

  newAccount(){
    this.router.navigate(['accounts/new-account'])
  }

  detailAccount(account: any){
    this.router.navigate(['account/',account.id])
  }

}
