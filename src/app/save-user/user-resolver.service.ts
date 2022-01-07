import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<User> {
  constructor(
    private router: Router,
    private userService: UserService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Observable<never> {
    const userId = route.params['id'];
    return this.userService.fetchUser(userId).pipe(
      mergeMap(user => {
        if (user) {
          return of(user);
        }
        void this.router.navigate(['/']);
        return EMPTY;
      }));
  }
}
