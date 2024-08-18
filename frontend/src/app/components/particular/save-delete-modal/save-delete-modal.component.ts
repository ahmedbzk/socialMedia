import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule,FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SocialService } from '../../../services/social.service';
import { ToastrService } from 'ngx-toastr';
import { ValidateLinkDirective } from '../../../shared/constants/directives';

@Component({
  selector: 'app-save-delete-modal',
  standalone: true,
  imports: [ReactiveFormsModule,ValidateLinkDirective],
  templateUrl: './save-delete-modal.component.html',
  styleUrl: './save-delete-modal.component.scss'
})
export class SaveDeleteModalComponent implements OnInit{

  @Input() selectedData: any;
  @Output() actionCompleted: EventEmitter<void> = new EventEmitter<void>();

  saveOrDeleteMediaForm!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private socialService: SocialService,
    private toastrService: ToastrService
  ){}

  
  ngOnInit(): void {
    this.saveOrDeleteMediaForm = this.fb.group({
      id: [null, Validators.required],
      link: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
    });

     if (this.selectedData) {
      this.saveOrDeleteMediaForm.patchValue(this.selectedData);
    }
  }
  
  // eğer form dolarsa tekrardan kontrol etmesi için gerekli fonksiyon
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedData'] && this.selectedData && Object.keys(this.selectedData).length > 0) {
      this.saveOrDeleteMediaForm.patchValue(this.selectedData);
    }
  }

  saveOrDeleteModalSubmit(value: string): void {
    if (value == 'vazgec') {
      this.toastrService.info('Islemden Vazgeçildi...');
    } else if (value == 'sil') {
      this.socialService.deleteSocialLink(this.saveOrDeleteMediaForm.value.id).subscribe(response => {
        this.toastrService.success('Sosyal Medya Basarıyla Silindi...', 'Basarılı!');
        this.actionCompleted.emit(); 
      });
    } else {
      this.socialService.updateSocialLink(this.saveOrDeleteMediaForm.value).subscribe(response => {
        this.toastrService.success('Sosyal veri güncellendi...', 'Basarılı!');
        this.actionCompleted.emit(); 
      });
    }
  }

}
