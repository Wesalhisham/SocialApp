import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment'; //production
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router)

  signUp(data:object):Observable<any>{
    return this.httpClient.post( environment.basUrl +"/users/signup" , data)
  }
  signIn(data:object):Observable<any>{
    return this.httpClient.post( environment.basUrl+"/users/signin" , data)
  }

  changePass(data:object):Observable<any>{
    return this.httpClient.patch(`${environment.basUrl}/users/change-password` , data)
  }

  signOut():void{
    localStorage.removeItem('socialToken');
    this.router.navigate(['/login'])
  }

  
  
}
