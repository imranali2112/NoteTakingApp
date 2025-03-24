import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; 
import { SaidBarComponent } from './components/said-bar/said-bar.component'; 
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component'; 
import { Note } from './interfaces/note';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SaidBarComponent, HeaderComponent, BodyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'NoteTakingApp';
  selectedNotes!: Note;
  selectNote(note: Note){
    this.selectedNotes = note;

  }
}
