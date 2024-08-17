import { Component } from '@angular/core';
import { TableComponent } from '../../not-pages/table/table.component';
import { CreateModalComponent } from "../../not-pages/create-modal/create-modal.component";
import { LoginComponent } from "../login/login.component";
import { HeaderComponent } from "../../not-pages/header/header.component";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [TableComponent, CreateModalComponent, LoginComponent, HeaderComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {


 
  
}



