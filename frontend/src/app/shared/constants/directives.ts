import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[validateLink]',
  standalone: true 
})
export class ValidateLinkDirective {
  @Input() validateLink: string = '';

  constructor(private el: ElementRef, private control: NgControl, private renderer: Renderer2) {}

  @HostListener('input', ['$event']) onInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    if (!this.isValidUrl(inputValue)) {
      this.control.control?.setErrors({ invalidLink: true });
      this.renderer.setStyle(this.el.nativeElement, 'border', '2px solid red');
    } else {
      this.control.control?.setErrors(null);
      this.renderer.setStyle(this.el.nativeElement, 'border', '1px solid #ced4da');
    }
  }

  private isValidUrl(url: string): boolean {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
    } catch {
      return false;
    }
  }
}
