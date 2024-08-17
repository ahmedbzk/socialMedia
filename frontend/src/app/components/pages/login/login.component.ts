import { Component, OnInit  } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { SocialService } from '../../../services/social.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  visible:boolean=false;

  constructor(private fb: FormBuilder,private toastrService:ToastrService,private router: Router, private socialService:SocialService){}
  
  ngOnInit(): void {
       // CREATE MEDİA FORM
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }


  loginSubmit() {
        this.socialService.userLogin(this.loginForm.value).subscribe(
            data => {
                if (data.result === true) {
                    localStorage.setItem('login', 'true');
                    this.toastrService.success('Başarılı giriş. Anasayfaya Yönlendiriliyorsunuz...', 'Başarılı');
                    this.visible = true;
                    setTimeout(() => {
                        this.router.navigate(['/homepage']);
                        this.visible = false;
                    }, 2000);
                } 
            },
            error => {
                this.toastrService.error('Lütfen doğru kullanıcı adı ve şifreyle giriş yapınız...', 'Basarısız giriş');
                localStorage.setItem('login', 'false');
            }
        );
  }
}

