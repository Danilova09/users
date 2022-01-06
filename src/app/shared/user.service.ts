import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = [];
  usersChange = new Subject<User[]>();
  fetchingUsers = new Subject<boolean>();

  constructor(
    public router: Router,
    public http: HttpClient,
  ) {
  }

  getUsers() {
    return this.users.slice();
  }


  fetchUsersData() {
    this.fetchingUsers.next(true);
    this.http.get<{ [id: string]: User }>('https://users-a9330-default-rtdb.firebaseio.com/users.json')
      .pipe(map(result => {
        if (result === null) {
          return [];
        }
        return Object.keys(result).map(id => {
          const userData = result[id];
          return new User(id, userData.name, userData.surname, userData.patronymic,
            userData.phoneNumber, userData.placeOfWorkStudy,
            userData.TShirt, userData.size, userData.description);
        });
      })).subscribe(users => {
      this.users = users;
      this.usersChange.next(users);
      this.fetchingUsers.next(false);
    }, () => {
      this.fetchingUsers.next(false);
    });

  }

  createUser(user: User) {
    const body = {
      name: user.name,
      surname: user.surname,
      patronymic: user.patronymic,
      phoneNumber: user.phoneNumber,
      placeOfWorkStudy: user.placeOfWorkStudy,
      TShirt: user.TShirt,
      size: user.size,
      description: user.description,
    };
    this.http.post('https://users-a9330-default-rtdb.firebaseio.com/users.json', body).subscribe(result => {
      console.log(result);
    });
    this.fetchUsersData();
    // void this.router.navigate(['/registered']);
  }

}
