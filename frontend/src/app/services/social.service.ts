import { Injectable } from '@angular/core';
import { Social } from '../shared/models/socialModel';
import { User } from '../shared/models/userModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SOCIAL_URL, USERLOGIN_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  constructor(private http:HttpClient) { }

  // Bütün sosyal medya datalarını aldığımız servis
  getSocialLinks(searchTerm:string=''): Observable<Social[]>{
    return this.http.get<Social[]>(SOCIAL_URL+ '?searchTerm='+searchTerm);
  }

   // Bütün sosyal medya datalarını ekleme servisi
   createSocialLink(socialLinkDatas:Social): Observable<any>{
    return this.http.post(SOCIAL_URL,socialLinkDatas);
  }


  // Sosyal medya datalarını düzenlemek için servis
  updateSocialLink(socialLinkDatas:Social):Observable<any>{
    return this.http.put(SOCIAL_URL + '/'+ socialLinkDatas.id , socialLinkDatas);
  }

  // Sosyal medya datalarını silmek için servis
  deleteSocialLink(socialLinkDatas:Social):Observable<any>{
    return this.http.delete(SOCIAL_URL + '/'+ socialLinkDatas);
  }

  // Login girişi
  userLogin(userData:User):Observable<any>{
    return this.http.post(USERLOGIN_URL,userData);
  }
}
