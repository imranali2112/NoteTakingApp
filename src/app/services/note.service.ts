import { Injectable } from '@angular/core';
import { Note } from '../interfaces/note';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notes: Note[] = [];
  private noteSubject = new BehaviorSubject<Note[]>([]);
  private isEdit = new BehaviorSubject<boolean>(false);
  private selectedNote = new BehaviorSubject<Note | null>(null); // New BehaviorSubject

  getEditable(): Observable<boolean> {
    return this.isEdit.asObservable();
  }

  setEditable(value: boolean): void {
    this.isEdit.next(value);
  }

  getNotesObservable(): Observable<Note[]> {
    return this.noteSubject.asObservable();
  }

  createNote(note: Note): void {
    note.id = new Date().getTime();
    this.notes.push(note);
    this.noteSubject.next(this.notes);
  }

  updateNote(updatedNote: Note): void {
    const index = this.notes.findIndex(note => note.id === updatedNote.id);
    if (index !== -1) {
      this.notes[index] = updatedNote;
      this.noteSubject.next(this.notes);
    }
  }

  deleteNotes(id: number): void {
    this.notes = this.notes.filter(note => note.id !== id);
    this.noteSubject.next(this.notes);
  }

  setSelectedNote(note: Note | null): void {
    this.selectedNote.next(note);
  }

  getSelectedNote(): Observable<Note | null> {
    return this.selectedNote.asObservable();
  }
}
