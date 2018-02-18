import { Component, OnInit, Input } from '@angular/core';
import { UserInformation, Address } from '../_models/user-information';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})

export class UserInformationComponent implements OnInit {

  sortOrder: string;
  sortColumn: string;
  isAscending: boolean;
  sortString: string;
  secondarySortString: string;

  @Input() userData: UserInformation[];
  constructor() { }

  ngOnInit() {
    this.sortOrder = '';
    this.sortColumn = '';
    this.isAscending = false;
  }

  // it will expand & collapase contact card for individual user at row level
  openContactCard(userInformation: UserInformation) {
    if (userInformation.isexpand) {
      userInformation.isexpand = false;
    } else {
      userInformation.isexpand = true;
    }
  }

  // method will sort user data in ascending and descending order
  sortUserInformation(sortString: string, secondarySortString: string) {
    this.sortString = sortString;
    this.secondarySortString = secondarySortString;
    this.sortColumn = sortString;

    if (this.sortOrder === 'ASC') {
      this.sortOrder = 'DESC';
      this.isAscending = true;
      this.userData.sort((a, b) => this.myComparer(a, b));
    } else {
      this.sortOrder = 'ASC';
      this.isAscending = false;
      this.userData.sort((a, b) => this.myComparer(a, b));
    }
  }
  
  myComparer(a, b) {
    if (this.sortOrder === 'ASC') {
      return this.comparePropertyAsc(a[this.sortString], b[this.sortString]) ||
        this.comparePropertyAsc(a[this.secondarySortString], b[this.secondarySortString]);
    } else {
      return this.comparePropertyDesc(a[this.sortString], b[this.sortString]) ||
        this.comparePropertyDesc(a[this.secondarySortString], b[this.secondarySortString]);
    }
  }

  comparePropertyAsc(a, b) {
    return (a || b) ? (!a ? -1 : !b ? 1 : a.localeCompare(b)) : 0;
  }

  comparePropertyDesc(a, b) {
    return (b || a) ? (!b ? -1 : !a ? 1 : b.localeCompare(a)) : 0;
  }
}
