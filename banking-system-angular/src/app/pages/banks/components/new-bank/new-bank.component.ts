import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BankService } from '../../services/bank.service';

@Component({
  selector: 'app-new-bank',
  templateUrl: './new-bank.component.html',
  styleUrls: ['./new-bank.component.scss']
})
export class NewBankComponent implements OnInit {

  name: any;
  submitted : boolean = false
  requestModel: any = {}
  constructor(private bankService: BankService,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit(): void {
  }

  saveBank(){
    this.submitted=true
    this.requestModel.name = this.name
    this.bankService.saveBank(this.requestModel).subscribe((response: any) => {
      if(response.success){
        this.messageService.add({severity: 'success', summary: 'Başarılı', detail: 'Banka oluşturuldu.'})
        this.router.navigate(['banks'])
      }else{
        this.messageService.add({severity: 'error', summary: 'Hata', detail: 'Banka oluştururken bir hata oluştu.'})
        
      }
    })
  }
}
