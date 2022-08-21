import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  username: any;
  removeAccount:boolean=false;
  activateDeactivateUser:boolean = false;
  constructor(private authService: AuthService,
    private router: Router) {
    this.username = localStorage.getItem('username');
     this.authService.hasPermission("REMOVE_ACCOUNT").then(x=>{
      this.removeAccount=x;
    });
    this.authService.hasPermission("ACTIVATE_DEACTIVATE_USER").then(x=>{
      this.activateDeactivateUser=x;
    });
   }

  ngOnInit(): void {
  }

  doLogout(){
    this.authService.doLogout()
  }

  routeAccounts(){
    this.router.navigate(['accounts'])
  }

  routeHome(){
    this.router.navigate([''])
  }

  routeUsers(){
    this.router.navigate(['users'])
  }

  routeBanks(){
    this.router.navigate(['banks'])
  }

  routeProfile(){
    this.router.navigate(['profile'])
  }

  routeAllAccounts(){
    this.router.navigate(['accounts/all'])
  }

  



  

}
