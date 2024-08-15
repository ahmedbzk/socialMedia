import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { Social } from '../../../shared/models/socialModel';
import { SocialService } from '../../../services/social.service';
import { SearchComponent } from "../search/search.component";
import { NotFoundComponent } from "../not-found/not-found.component";
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, SearchComponent, NotFoundComponent,HttpClientModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {

  socialDatas: Social[] = [];
  visible: boolean = false;
  searchTerm:string='';

  constructor(private socialService: SocialService) {
  }

  ngOnInit() {
    this.searchFunction('');

   
  }


  // Search butonu aramaları için gerekli table.ts dosyasındaki fonksiyon.
  searchFunction(searchTerm: string): void {
    this.socialService.getSocialLinks(searchTerm).subscribe(data=>{
      this.socialDatas=data;
      this.updateVisibility();
     })
  }

  updateVisibility() {
    this.visible = !this.socialDatas || this.socialDatas.length === 0;
  }
}