import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

// shared/components/search-bar/search-bar.component.ts
@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `<input (input)="onSearch($event)" [placeholder]="placeholder" />`,
})
export class SearchBarComponent {
  @Input() placeholder = 'Search...';
  @Output() search = new EventEmitter<string>();

  onSearch(event: any) {
    this.search.emit(event.target.value);
  }
}
