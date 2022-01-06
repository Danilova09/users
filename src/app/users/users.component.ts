import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  isFetchingUsers = false;
  usersSubscription!: Subscription;
  usersFetchingSubscription!: Subscription;

  constructor(
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.users = this.userService.getUsers();
    this.usersSubscription = this.userService.usersChange.subscribe((users: User[]) => {
      this.users = users;
    });
    this.usersFetchingSubscription = this.userService.fetchingUsers.subscribe((isFetching: boolean) => {
      this.isFetchingUsers = isFetching;
    });
    this.userService.fetchUsersData();
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
    this.usersFetchingSubscription.unsubscribe();
  }
}
