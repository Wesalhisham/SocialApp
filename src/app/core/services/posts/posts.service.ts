import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {

  private readonly httpClient= inject(HttpClient);
  
  

  getAllPosts():Observable<any>{
    return this.httpClient.get(`${environment.basUrl}/posts`)
  }

  creatPost(data:any):Observable<any>{
    return this.httpClient.post(`${environment.basUrl}/posts` , data )
  }

  getSinglePost(postId:string):Observable<any>{
    return this.httpClient.get(`${environment.basUrl}/posts/${postId}`  )
  }
  
  deletePost(postId:string):Observable<any>{
     return this.httpClient.delete(`${environment.basUrl}/posts/${postId}` )
  }

  updatePost(postId:string , data:any):Observable<any>{
    return this.httpClient.put(`${environment.basUrl}/posts/${postId}`, data)
  }

  likeUnlikePost(postId:string):Observable<any>{
    return this.httpClient.put(`${environment.basUrl}/posts/${postId}/like`, null)
  }

  saveUnsave(postId:string):Observable<any>{
    return this.httpClient.put(`${environment.basUrl}/posts/${postId}/bookmark`, null)
  }

  sharePost(postId:string , data:any):Observable<any>{
    return this.httpClient.post(`${environment.basUrl}/posts/${postId}/share` , data)
  }
  
}
