import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/services/auth.service';
import { BankService } from '../../services/bank.service';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.scss']
})
export class BanksComponent implements OnInit {
  banks: any = []
  isCreateBank:boolean=false;
  constructor(private bankService: BankService,
    private authService:AuthService,
    private router:Router) {
      this.authService.hasPermission("CREATE_BANK").then(x=>{
        this.isCreateBank=x;
      });
     }

  ngOnInit(): void {
    this.getBanks();
  }

  getBanks(){
    this.bankService.getBanks().subscribe((response: any) => {
      this.banks = response;
    })
  }

  newBank(){
    this.router.navigate(['banks/new-bank'])
  }

}
