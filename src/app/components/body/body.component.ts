import { Component, EventEmitter, Output } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { Note } from '../../interfaces/note';
import { NoteFormComponent } from '../note-form/note-form.component';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss',
  imports:[NoteFormComponent]
})
export class BodyComponent {
  isAddNote = false;
  notes: Note[] = [];
  isView?: Note | null;
  deleteMessage: string | null = null;

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.noteService.getNotesObservable().subscribe((notes: Note[]) => {
      this.notes = notes;
    });
  }

  openNote(): void {
    this.isAddNote = true;
  }

  closeNote(): void {
    this.isAddNote = false;
    this.noteService.setEditable(false);
    this.noteService.setSelectedNote(null);
  }

  viewNote(note: Note) {
    this.isView = note;
  }

  closeViewNote() {
    this.isView = null;
  }

  editNotes(note: Note): void {
    this.noteService.setSelectedNote(note);
    this.noteService.setEditable(true);
    this.openNote();
  }

  deleteNotes(id: number): void {
    this.noteService.deleteNotes(id);
    this.deleteMessage = "Note deleted successfully!";

    setTimeout(() => {
      this.deleteMessage = null;
    }, 2000);
  }
}
