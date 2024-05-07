import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private url = environment.SERVER_URL;
  public typeUserCreate: string = '';

  constructor(private httpService: HttpClient) { }

  public validateUser(username:string, password:string):Observable<any>{
    const body = {username, password};
    return this.httpService.post(`${this.url}authentication/login`,body )
  }



}
