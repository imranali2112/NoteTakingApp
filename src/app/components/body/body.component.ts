import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NoteService } from '../../services/note.service';
import { Note } from '../../interfaces/note';
import { NoteFormComponent } from '../note-form/note-form.component';
import { flatMap } from 'rxjs';

@Component({
  selector: 'app-body',
  imports: [NoteFormComponent],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss',
})
export class BodyComponent {
  isAddNote = false;
  notes: Note[] = [];
  isEditMode: boolean = false;
  isView?: Note | null;
  @Output() selectedNote = new EventEmitter<(Note)>();
  deleteMessage:string | null = null;


  // open the add notes popup
  openNote(): void {
    this.isAddNote = true;
    // this.noteService.setOpen(true);
  }
  closeNote(): void {
    this.isAddNote = false;
  }

  // Read a notes 
  viewNote(note:Note){
    this.isView = note;
  }
  closeViewNote(){
    this.isView = null;
  }
  
  constructor(private noteServices: NoteService) {}

  ngOnInit(): void {
    this.noteServices.getNotesObservable().subscribe((notes: Note[]) => {
      this.notes = notes;
    });
  }

  editNotes(note: Note): void {
    this.selectedNote.emit(note);
    this.noteServices.setEditable(true); 
    this.openNote();
  }

   
  deleteNotes(id: number): void {
    this.noteServices.deleteNotes(id);
    this.deleteMessage = "Note deleted successfully!"

    setTimeout(() => {
      this.deleteMessage = null;
    }, 2000);
  }
}
