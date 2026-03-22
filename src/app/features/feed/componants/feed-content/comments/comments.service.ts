import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {

  private readonly httpClient = inject(HttpClient);
 

  getPostComment(postId:string):Observable<any>{
    return this.httpClient.get(`${environment.basUrl}/posts/${postId}/comments?page=1&limit=10`)
  }

  creatComment(data:object , postId:string):Observable<any>{
    return this.httpClient.post(`${environment.basUrl}/posts/${postId}/comments` , data )
  }
  updateComment(postId: string, commentId: string, data:object) {
  return this.httpClient.put(`${environment.basUrl}/posts/${postId}/comments/${commentId}`, data);
}

  deletComment(postId:string , commentId:string){
    return this.httpClient.delete(`${environment.basUrl}/posts/${postId}/comments/${commentId}`)

  }
  
}
