import { Component,EventEmitter,OnInit, Output} from '@angular/core';
import { ReactiveFormsModule,FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SocialService } from '../../../services/social.service';
import { ToastrService } from 'ngx-toastr';
import { ValidateLinkDirective } from '../../../shared/constants/directives';

@Component({
  selector: 'app-create-modal',
  standalone: true,
  imports: [ReactiveFormsModule,ValidateLinkDirective],
  templateUrl: './create-modal.component.html',
  styleUrl: './create-modal.component.scss'
})
export class CreateModalComponent implements OnInit{

  createMediaForm!: FormGroup;
  @Output() recordAdded: EventEmitter<void> = new EventEmitter<void>();

  
  constructor(
    private fb: FormBuilder,
    private socialService: SocialService,
    private toastrService: ToastrService
  ){}
  
  ngOnInit(): void {
     // CREATE MEDİA FORM
     this.createMediaForm = this.fb.group({
      link: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
    
  }

  // yeni veri kaydı
  createModalSubmit(): void {
    if (this.createMediaForm.valid) {
      const formData = this.createMediaForm.value;
      this.socialService.createSocialLink(formData).subscribe(response => {
        this.toastrService.success('Veri Basarıyla Eklendi...', 'İslem Basarılı!');
        this.createMediaForm.reset();
        this.recordAdded.emit();  // Kaydın eklendiğini üst bileşene bildiriyoruz
      }, error => {
        this.toastrService.error('Lütfen Verileri Eksiksiz Giriniz...', 'İslem Basarısız!');
      });
    }
  }

  // veri vazgeçme butonu
  createModalDismiss(): void {
    this.createMediaForm.reset();
    this.toastrService.info('Islemden Vazgeçildi...');
  }

 
}
  
