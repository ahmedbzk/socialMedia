import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private router: Router,private toastrService:ToastrService){}

  logOutClick(){
    localStorage.setItem('login','false');
    this.toastrService.info('Basarıyla cıkıs yaptınız. Giris sayfasına yonlendiriliyorsunuz...','Basarılı!')
    setTimeout(() => {
      this.router.navigate(['/login']); 
    }, 1000);
  }
}
