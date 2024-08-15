import { Injectable } from '@angular/core';
import { Social } from '../shared/models/socialModel';
import { social_datas } from '../../data';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  constructor() { }

  // Bütün sosyal medya datalarını aldığımız servis
  getAll():Social[]{
    return social_datas;
  }

  // Sosyal medya datalarını adına göre search ettiğimiz servis
  getAllSocialsBySearch(searchTerm:string):Social[]{
    return this.getAll().filter(social => social.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }
}
