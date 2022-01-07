import { Component, Input } from '@angular/core';
import { User } from '../../../shared/user.model';
import { UserService } from '../../../shared/user.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent {
  @Input() user!: User;
  isRemoving: boolean = false;

  constructor(
    private userService: UserService,
  ) {}

  remove() {
    this.isRemoving = true;
    this.userService.removeUser(this.user).pipe(
      tap(() => {
        this.isRemoving = false;
      }, () => {
        this.isRemoving = false;
      })).subscribe(() => {
      this.userService.fetchUsersData();
    });
  }
}
