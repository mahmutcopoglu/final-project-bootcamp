import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AccountDetailService } from '../../services/account-detail.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {
  id: any;
  account: any = {};

  addAmount: boolean = false;
  transferMoney: boolean = false;

  amount: any;

  transferAmount: any;
  receiverAccountId: any;

  requestModel: any = {}
  constructor(private accountDetailService: AccountDetailService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService) {
      this.id = this.route.snapshot.params['id'];
     }

  ngOnInit(): void {
    this.getAccount()
  }

  getAccount(){
    this.accountDetailService.getAccountDetailById(this.id).subscribe((response: any) => {
      this.account = response.account;
    })
  }

  returnHome(){
    this.router.navigate([''])
  }

  add(){
    this.requestModel.amount = this.amount;
    this.accountDetailService.addAmount(this.id,this.requestModel).subscribe((response: any) => {
      if(response.success){
        this.messageService.add({severity: 'success', summary: 'Başarılı', detail: 'Hesabınıza başarılı bir şekilde para yüklediniz.'})
        this.addAmount = false;
        this.amount = ''
        this.getAccount()
      }else{
        this.messageService.add({severity: 'error', summary: 'Hata', detail: 'Para yüklemede bir sorun oluştu.'})
        this.addAmount = false;
      }
    })
  }

  transfer(){
    this.requestModel.amount = this.transferAmount;
    this.requestModel.receiverAccountId = this.receiverAccountId;
    this.accountDetailService.transferMoney(this.id,this.requestModel).subscribe((response: any) => {
      if(response.success){
        this.messageService.add({severity: 'success', summary: 'Başarılı', detail: response.message})
        this.transferMoney = false;
        this.transferAmount = ''
        this.receiverAccountId = ''
        this.getAccount()
      }else{
        this.messageService.add({severity: 'error', summary: 'Hata', detail: 'Transfer işleminde bir hata oluştu.'})
        this.transferMoney = false;
      }
    })
  }

}
