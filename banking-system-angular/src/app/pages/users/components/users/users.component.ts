import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/services/auth.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any = []
  isActivateDeactiveUser:boolean=false;
  constructor(private usersService: UsersService,
    private authService:AuthService,
    private router: Router) {
      this.authService.hasPermission("ACTIVATE_DEACTIVATE_USER").then(x=>{
        this.isActivateDeactiveUser=x;
      });
     }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.usersService.getUsers().subscribe((response: any) => {
      this.users = response;
    })
  }

  detailUser(user:any){
    this.router.navigate(['users/',user.id])
    
  }

}
