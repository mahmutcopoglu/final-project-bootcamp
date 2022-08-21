import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile: any = {}
  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.getProfile()
  }

  getProfile(){
    this.profileService.getUserDetail().subscribe((response: any) => {
      this.profile = response;
      this.profile.authorities = response.authorities.split(",")
    })
  }


}
