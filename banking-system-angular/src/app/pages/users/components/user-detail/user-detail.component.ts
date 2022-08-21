import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  id: any;
  user: any = {};
  userAccounts: any = []
  requestModel: any = {}
  constructor(private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {
      this.id = this.route.snapshot.params['id'];
     }

  ngOnInit(): void {
    this.getUser()
    this.getUserAccount();
  }

  getUser(){
    this.usersService.getUserDetailById(this.id).subscribe((response: any) => {
      this.user = response;
      this.user.authorities = response.authorities.split(",")
    })
  }

  getUserAccount(){
    this.usersService.getAccountByUserId(this.id).subscribe((response: any) => {
      this.userAccounts = response.data;
    })
  }

  changeEnabled(){

    this.confirmationService.confirm({
      message: 'Kullanıcı güncelleniyor. Emin misiniz?',
      header: 'İşlem Onay',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.requestModel.enabled = this.user.enabled;
        this.usersService.changeEnabledUser(this.id,this.requestModel).subscribe((response: any) => {
          if(response.status=="success"){
            this.messageService.add({severity: 'success', summary: 'Başarılı', detail: 'Kullanıcı başarıyla güncellendi.'})
            this.getUser();
            
          }else{
            this.messageService.add({severity: 'error', summary: 'Hata', detail: 'Kullanıcı güncellemede bir hata oluştu.'})
            
          }
        })
      },
      reject: () => {
          
      }
  });


  }

  returnUsers(){
    this.router.navigate(['users'])
  }

}
