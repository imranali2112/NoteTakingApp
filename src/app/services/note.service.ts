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

  getEditable(){
    return this.isEdit.asObservable();
  }
  setEditable(value:boolean){
    this.isEdit.next(value);
  }

  getNotesObservable(): Observable<Note[]>{
    return this.noteSubject.asObservable();
  }

  createNote(note: Note): void{
    note.id = new Date().getTime();
    this.notes.push(note);
    this.noteSubject.next(this.notes);
  }

  deleteNotes(id:number):void{
    this.notes = this.notes.filter(note => note.id !== id)
    this.noteSubject.next(this.notes);

  }
}
