import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  accounts: any = []
  username: any;
  constructor(private homeService: HomeService,
    private router: Router) {
    this.getAccounts();
    this.username = localStorage.getItem('username')
   }

  ngOnInit(): void {
  }

  getAccounts(){
    this.homeService.getAccounts().subscribe((response: any) => {
      this.accounts = response.data;
    })
  }

  detailAccount(account: any){
    this.router.navigate(['account/',account.id])
  }

}
