import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { Social } from '../../../shared/models/socialModel';
import { SocialService } from '../../../services/social.service';
import { NotFoundComponent } from "../not-found/not-found.component";
import { HttpClientModule } from '@angular/common/http';
import { CreateModalComponent } from '../create-modal/create-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CapitalizePipe  } from '../../../shared/constants/pipes'
import { SaveDeleteModalComponent } from "../save-delete-modal/save-delete-modal.component";
import { PaginationComponent } from "../pagination/pagination.component";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, NotFoundComponent, HttpClientModule, CreateModalComponent, ReactiveFormsModule, CapitalizePipe, SaveDeleteModalComponent, PaginationComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {

  socialDatas: Social[] = [];
  visible: boolean = false;
  searchTerm:string='';
  selectedSocial: any = [];
  clickedLinks: string[] = [];
  visitedLinks: { link: string, count: number }[] = [];

  pageRow!:number;
  currentPage: number = 1;
  paginatedData: any[] = [];


  constructor(private socialService: SocialService) {
    const savedPageRows = localStorage.getItem('pageRows');

    if(savedPageRows==null){
      this.pageRow=4;
    }else{
      this.pageRow = JSON.parse(savedPageRows);
    }
    console.log(this.pageRow)

   }

  ngOnInit() {
    this.searchFunction('');
    this.getVisitedLinksFromLocalStorage();
  }

  // Son gezdiklerim fonksiyonları
  saveLinkToLocalStorage(link: string): void {
    let visitedLinks: { link: string, count: number }[] = JSON.parse(localStorage.getItem('visitedLinks') || '[]');
    const existingLink = visitedLinks.find(item => item.link === link);
    if (existingLink) {
      existingLink.count++;
    } else {
      visitedLinks.push({ link: link, count: 1 });
    }
    localStorage.setItem('visitedLinks', JSON.stringify(visitedLinks));
    this.getVisitedLinksFromLocalStorage();
  }
  getVisitedLinksFromLocalStorage(): void {
    this.visitedLinks = JSON.parse(localStorage.getItem('visitedLinks') || '[]');
  }

  // SAVE OR DELETE MODAL AÇILDIĞINDA SEÇİLEN VERİNİN BİLGİLERİ
  openSDModal(selectedData:any){
    this.selectedSocial=selectedData
  }

  // Search butonu aramaları için gerekli table.ts dosyasındaki fonksiyon.
  searchFunction(searchTerm: string): void {
    this.socialService.getSocialLinks(searchTerm).subscribe(data=>{
      this.socialDatas=data;
      this.updateVisibility();
      this.updatePagination(this.currentPage); // Mevcut sayfa için tabloyu güncelle

     })
  }

  

  // Eğer tabloda searchbar çalıştıktan sonra veri gelmiyorsa ekrana gelecek notFound sayfası
  updateVisibility() {
    this.visible = !this.socialDatas || this.socialDatas.length === 0;
  }

  onPageSizeChanged(value:number){
    this.pageRow=value;
    this.currentPage = 1; // Sayfa boyutu değiştiğinde ilk sayfaya geri dön
    this.updatePagination(this.currentPage);
  }

  updatePagination(page: number) {
    const start = (page - 1) * this.pageRow;
    const end = start + this.pageRow;
    this.paginatedData = this.socialDatas.slice(start, end);
  }

  onPageChanged(page: number) {
    this.currentPage = page;
    this.updatePagination(page);
  }

}