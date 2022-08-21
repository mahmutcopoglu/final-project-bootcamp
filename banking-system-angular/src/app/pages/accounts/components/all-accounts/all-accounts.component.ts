import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AccountsService } from '../../services/accounts.service';

@Component({
  selector: 'app-all-accounts',
  templateUrl: './all-accounts.component.html',
  styleUrls: ['./all-accounts.component.scss']
})
export class AllAccountsComponent implements OnInit {
  accounts: any = []
  constructor(private accountsService: AccountsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getAllAccounts();
  }

  getAllAccounts(){
    this.accountsService.getAllAccounts().subscribe((response: any) => {
      this.accounts = response.data;
    })
  }

  removeAccount(account: any){

    this.confirmationService.confirm({
      message: 'Hesap siliniyor. Emin misiniz?',
      header: 'İşlem Onay',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.accountsService.removeAccount(account.id).subscribe((response: any) => {
          if(response.success){
            this.messageService.add({severity: 'success', summary: 'Başarılı', detail: 'Hesap başarıyla silindi'})
            this.getAllAccounts()
            
          }else{
            this.messageService.add({severity: 'error', summary: 'Hata', detail: 'Hesap silmede bir hata oluştu.'})
            
          }
        })
      },
      reject: () => {
          
      }
  });


  }

}
