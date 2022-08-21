import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RegisterComponent } from 'src/app/pages/register/components/register/register.component';
import { AuthService } from 'src/app/security/services/auth.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  requestModel: any = {}

  username: any;
  password: any;

  ref: DynamicDialogRef = new DynamicDialogRef();
  constructor(private loginService: LoginService,
    private messageService: MessageService,
    public dialogService: DialogService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  loginUser(){
    this.requestModel.username = this.username;
    this.requestModel.password = this.password;

    this.loginService.loginUser(this.requestModel).subscribe(
      (response: any) => {
        if(response.success){
          this.authService.storeToken(response.token);
          this.authService.setUsername(this.username)
          this.messageService.add({severity: 'success', summary: 'Başarılı', detail: 'Giriş başarılı anasayfaya yönlendiriliyorsunuz.'})
          this.router.navigate(['']);
     
        }
      }
    )
  }

  dynamicDialog(){
    this.ref = this.dialogService.open(RegisterComponent, {
      header: 'Kayıt Ol',
      width: '50vw'
    })
  }
  

}
