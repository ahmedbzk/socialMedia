import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { Social } from '../../../shared/models/socialModel';
import { SocialService } from '../../../services/social.service';
import { NotFoundComponent } from "../not-found/not-found.component";
import { HttpClientModule } from '@angular/common/http';
import { CreateModalComponent } from '../create-modal/create-modal.component';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CapitalizePipe  } from '../../../shared/constants/pipes'
import { ValidateLinkDirective  } from '../../../shared/constants/directives'

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, NotFoundComponent,HttpClientModule,CreateModalComponent,ReactiveFormsModule,CapitalizePipe,ValidateLinkDirective],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {

  socialDatas: Social[] = [];
  visible: boolean = false;
  searchTerm:string='';
  createMediaForm!: FormGroup;
  saveOrDeleteMediaForm!: FormGroup;
  selectedSocial: any = [];

  constructor(private socialService: SocialService,private fb: FormBuilder,private toastrService:ToastrService) {}

  ngOnInit() {
    // BAŞLANGIÇTA VERİLERİ GETİRECEK OLAN FONKSİYON
    this.searchFunction('');

    // CREATE MEDİA FORM
    this.createMediaForm = this.fb.group({
      link: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required]
    });

    // SAVE OR DELETE FORM
    this.saveOrDeleteMediaForm = this.fb.group({
      id:[null,Validators.required],
      link: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
   
  }

  // create modal submit fonksiyonu
  createModalSubmit(): void {
    if (this.createMediaForm.valid) {
      const formData = this.createMediaForm.value;
      this.socialService.createSocialLink(formData).subscribe(response=>{
        this.toastrService.success('Veri Basarıyla Eklendi...','Islem Basarılı!');
        this.createMediaForm.reset(); 
        this.searchFunction('');
      })
    } else {
      this.toastrService.error('Lutfen Verileri Eksiksiz Giriniz...','Işlem Basarısız!')
    }
  }

  // create modal dismiss fonksiyonu
  createModalDismiss(): void{
    this.createMediaForm.reset();
    this.toastrService.info('Islemden Vazgecildi...')
  }

  // SAVE OR DELETE MODAL AÇILDIĞINDA SEÇİLEN VERİNİN BİLGİLERİ
  openSDModal(selectedData:any){
    this.selectedSocial=selectedData

    // Seçilen modal datasını form üzerinde güncelliyoruz.
    this.saveOrDeleteMediaForm.patchValue({
      id: selectedData.id,
      link: selectedData.link,
      name: selectedData.name,
      description: selectedData.description
    });
  }

  // SAVE OR DELETE MODAL AÇILDIĞINDA yapılacak silme-güncelleme-vazgeçme işlemleri
  saveOrDeleteModalSubmit(value:string): void {
    if(value == 'vazgec'){
      this.toastrService.info('Islemden Vazgeçildi...')
    }
    else if(value == 'sil'){
      this.socialService.deleteSocialLink(this.selectedSocial).subscribe(response=>{
        this.toastrService.success('Sosyal Medya Başarıyla Silindi...','Basarılı!')
        this.searchFunction('');
      })
    }
    else{
      this.socialService.updateSocialLink(this.saveOrDeleteMediaForm.value).subscribe(response=>{ 
        this.toastrService.success('Sosyal veri güncellendi...','Basarılı!')
        this.searchFunction('');
      })
    }
  }

  // Search butonu aramaları için gerekli table.ts dosyasındaki fonksiyon.
  searchFunction(searchTerm: string): void {
    this.socialService.getSocialLinks(searchTerm).subscribe(data=>{
      this.socialDatas=data;
      this.updateVisibility();
     })
  }

  // Eğer tabloda searchbar çalıştıktan sonra veri gelmiyorsa ekrana gelecek notFound sayfası
  updateVisibility() {
    this.visible = !this.socialDatas || this.socialDatas.length === 0;
  }

}