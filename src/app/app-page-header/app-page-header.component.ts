import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UserInformation } from '../_models/user-information';
import { NwmAppService } from '../_service/nwm-app.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './app-page-header.component.html',
  styleUrls: ['./app-page-header.component.css']
})

export class AppPageHeaderComponent implements OnInit {

  isSearhValid: boolean;
  filterText: string;
  searchForm: FormGroup;
  userMasterData: UserInformation[];
  userFilterData: UserInformation[];

  constructor(formBuild: FormBuilder, private appService: NwmAppService) {
    this.searchForm = formBuild.group({
      'userText': []
    });
  }

  ngOnInit() {
    this.isSearhValid = true;
    this.getUserInformation();
  }

  // this method will reload master user data
  reloadUser() {
    if (!this.userMasterData) {
      this.userFilterData = this.userMasterData;
    } else {
      this.getUserInformation();
    }
  }

  // this method will call on click of search button
  // method will redirect to user-information page and it will search specific user
  filterUser(value: any) {
    if (value == null || value.userText === undefined || value.userText === '') {
      this.isSearhValid = false;
    } else {
      this.isSearhValid = true;

      this.filterUserInformation(value.userText);
    }
  }

  // this method will filter the data on click of search button
  filterUserInformation(searchCriteria) {
    this.userFilterData = this.userMasterData.filter((item) => item.name.includes(searchCriteria));
  }

  // get user information from api
  getUserInformation() {
    this.appService.getUserInformation()
      .subscribe((data) => {
        this.userMasterData = data;
        this.userFilterData = this.userMasterData;
      },
      (err: any) => {
        console.log(err);
      });
  }
}
