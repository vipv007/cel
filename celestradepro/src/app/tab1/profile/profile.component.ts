import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  earns: any[];
company: any;
companyProfile: any;

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.getEarns();
  }

  getEarns() {
    this.profileService.getAllProfiles().subscribe(
      (data: any[]) => {
        this.earns = data;
        console.log(this.earns);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
