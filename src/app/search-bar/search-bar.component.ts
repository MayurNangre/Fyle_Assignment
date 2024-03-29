import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'] // Check if this path is correct
})

export class SearchBarComponent {
  username: string = '';

  @Output() searchEvent = new EventEmitter<string>();

  searchRepositories() {
    this.searchEvent.emit(this.username);
  }  
  
}



