import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../shared/user.model';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  @Input() user!: User;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  remove() {
    this.userService.removeUser(this.user);
  }
}
