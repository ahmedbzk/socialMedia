import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule,Location } from '@angular/common'; 

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})

export class NotFoundComponent implements OnInit{

  @Input() visible=false;
  @Input() notFoundMessage= "Hiçbir şey bulunamadı...";
  @Input() resetLinkText= "Sayfayı Yenile";

  constructor(private location: Location){}
  
  ngOnInit(): void {
      
  }

  // Sayfayı yenilemek için gerekli fonksiyon
  routePage(){
    window.location.reload();
  }
  
}
