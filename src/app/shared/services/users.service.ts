import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../models/user.models';

@Injectable({providedIn: 'root'})
export class UsersService {

  constructor(private httpClient: HttpClient) {}

  getUserByEmail(email: string): Observable<User> {
    return this.httpClient.get(`http://localhost:3000/users?email=${email}`)
       .pipe(
         map((user: User[]) => user[0] ? user[0] : undefined));
  }
  createNewUser(user: User): Observable<User> {
    return this.httpClient.post<User>('http://localhost:3000/users', user);
  }

}

