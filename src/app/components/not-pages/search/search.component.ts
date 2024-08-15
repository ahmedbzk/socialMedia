import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})

export class SearchComponent implements OnInit{

  searchTerm:string='';

  // search component ile table component arasındaki arama yapabilme ilişkisi için eventEmitter ekliyorum.
  @Output() searchTermChange = new EventEmitter<string>();


  constructor(){}

  ngOnInit(): void {
      
  }

  searchFunction(term:string):void{
      this.searchTermChange.emit(term);
  }
}
