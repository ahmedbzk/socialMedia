import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnChanges  {

  @Input() pageRows: number;
  @Output() pageRowsChanged = new EventEmitter<number>();
  @Output() pageChanged = new EventEmitter<number>();

  @Input() totalItems: number = 0;
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(){

    const savedPageRows = localStorage.getItem('pageRows');
    if (savedPageRows) {
      this.pageRows = JSON.parse(savedPageRows);
    } else {
      this.pageRows = 4; 
      localStorage.setItem('pageRows', JSON.stringify(this.pageRows));
    }

    this.pageRowsChanged.emit(this.pageRows);
    
  }

 ngOnInit(): void {
  this.calculateTotalPages();

  this.pageRowsChanged.emit(this.pageRows);
 }

  ngOnChanges() {
    this.calculateTotalPages();
  }

  changePageRows(value:number){
    this.pageRows=value;
    localStorage.setItem('pageRows', JSON.stringify(this.pageRows));
    this.pageRowsChanged.emit(this.pageRows);
  }
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.totalItems / this.pageRows);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChanged.emit(this.currentPage);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageChanged.emit(this.currentPage);
    }
  }

  onPageInputChange(event: any) {
    const inputPage = parseInt(event.target.value, 10);
    if (inputPage >= 1 && inputPage <= this.totalPages) {
      this.currentPage = inputPage;
      this.pageChanged.emit(this.currentPage);
    } else {
      // Eğer kullanıcı geçersiz bir değer girdiyse, input alanını geri döndür
      event.target.value = this.currentPage;
    }
  }

}
