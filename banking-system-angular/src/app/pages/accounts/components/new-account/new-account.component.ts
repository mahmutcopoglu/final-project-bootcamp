import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AccountsService } from '../../services/accounts.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss']
})
export class NewAccountComponent implements OnInit {

  banks: any = []
  types: any = []
  selectedBank: any;
  selectedType: any;

  requestModel: any = {}
  submitted: boolean = false;
  constructor(private accountsService: AccountsService,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit(): void {
    this.getBanks();
    this.types = [
      {name: "Altın", code: 'ALTIN'},
      {name: "Türk Lirası", code: 'TRY'},
      {name: "Dolar", code: 'USD'},
    ]
  }

  getBanks(){
    this.accountsService.getBanks().subscribe((response: any) => {
      this.banks = response;
    })
  }

  saveAccount(){
    this.submitted=true
    this.requestModel.bank_id = this.selectedBank.id
    this.requestModel.type = this.selectedType.code
    this.accountsService.saveAccount(this.requestModel).subscribe((response: any) => {
      if(response.success){
        this.messageService.add({severity: 'success', summary: 'Başarılı', detail: 'Yeni hesap oluşturuldu.'})
        this.router.navigate([''])
      }else{
        this.messageService.add({severity: 'error', summary: 'Hata', detail: 'Hesap oluştururken bir hata oluştu.'})
        
      }
    })
  }

}
