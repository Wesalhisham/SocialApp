import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
    private readonly httpClient = inject(HttpClient);


  getMyProfile():Observable<any>{
    return this.httpClient.get(`${environment.basUrl}/users/profile-data`)
  }

  uploadProfilePhoto(data:object):Observable<any>{
    return this.httpClient.put(`${environment.basUrl}/users/upload-photo` , data)
  }

  getBookmarks():Observable<any>{
    return this.httpClient.get(`${environment.basUrl}/users/bookmarks`)
  }
  getPosts(userId:string):Observable<any>{
    return this.httpClient.get(`${environment.basUrl}/users/${userId}/posts`)
  }

  
}
