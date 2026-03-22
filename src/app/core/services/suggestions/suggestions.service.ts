import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SuggestionsService {

  private readonly httpClient= inject(HttpClient);

  
  getFreindSuggestions():Observable<any>{
    return this.httpClient.get(`${environment.basUrl}/users/suggestions?limit=3` )
  }

  followFrind(id:string):Observable<any>{
    return this.httpClient.put(`${environment.basUrl}/users/${id}/follow` , null)
  }
}
