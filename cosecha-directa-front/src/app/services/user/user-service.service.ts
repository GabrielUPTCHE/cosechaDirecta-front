import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable} from 'rxjs';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private url = environment.SERVER_URL;
  public typeUserCreate: string = '';
  public loggedUser= signal<any>(undefined);

  constructor(private httpService: HttpClient) { }

   validateUser(username:string, password:string):Observable<any>{
    const body = {username, password};
    return this.httpService.post(`${this.url}authentication/login`,body )
  }

   createUser(user: User):Observable<any>{
    return this.httpService.post<any>(`${this.url}user/create`, user);
  }

  setLoggedUser():User {
    const decodeUser = jwtDecode(sessionStorage.getItem('token'));
    this.loggedUser.set(decodeUser);
    return this.loggedUser()?.user;
  }

  getLoggedUser(): any{
    const decodeUser = jwtDecode(sessionStorage.getItem('token'));
    return decodeUser;
  }

  



}
