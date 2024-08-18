import { Component } from '@angular/core';
import { TableComponent } from '../../particular/table/table.component';
import { CreateModalComponent } from "../../particular/create-modal/create-modal.component";
import { LoginComponent } from "../login/login.component";
import { HeaderComponent } from "../../particular/header/header.component";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [TableComponent, CreateModalComponent, LoginComponent, HeaderComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {


 
  
}



