import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { Social } from '../../../shared/models/socialModel';
import { SocialService } from '../../../services/social.service';
import { SearchComponent } from "../search/search.component";
import { NotFoundComponent } from "../not-found/not-found.component";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, SearchComponent, NotFoundComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {

  socialDatas: Social[] = [];
  visible: boolean = false;

  constructor(private socialService:SocialService){}

  ngOnInit() {
    this.socialDatas = this.socialService.getAll();
  }


  // Search butonu aramaları için gerekli table.ts dosyasındaki fonksiyon.
  onSearch(searchTerm: string): void {
    if (searchTerm.trim() === '') {
      this.socialDatas = this.socialService.getAll();
    } else {
      this.socialDatas = this.socialService.getAllSocialsBySearch(searchTerm);
      console.log(this.socialDatas)
       // notfound componentinin çalışması için gereken visible sorgulaması
      this.visible = !this.socialDatas || this.socialDatas.length == 0;
    }
  }

 
}