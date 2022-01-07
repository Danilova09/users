import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = [];
  usersChange = new Subject<User[]>();
  fetchingUsers = new Subject<boolean>();

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

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

  fetchUser(id: string) {
    return this.http.get<User | null>(`https://users-a9330-default-rtdb.firebaseio.com/users/${id}.json`).pipe(
      map(result => {
        if (!result) {
          return null;
        }
        return new User(
          id, result.name, result.surname,
          result.patronymic, result.phoneNumber,
          result.placeOfWorkStudy, result.TShirt,
          result.size, result.description);
      }));
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
    return this.http.post('https://users-a9330-default-rtdb.firebaseio.com/users.json', body)
      .pipe(tap(() => {
        void this.router.navigate(['/registered']);
      }));
  }

  editUser(user: User) {
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
    return this.http.put(`https://users-a9330-default-rtdb.firebaseio.com/users/${user.id}.json`, body)
      .pipe(tap(() => {
        void this.router.navigate(['/']);
      }));
  }

  removeUser(user: User) {
    return this.http.delete(`https://users-a9330-default-rtdb.firebaseio.com/users/${user.id}.json`);
  }
}
