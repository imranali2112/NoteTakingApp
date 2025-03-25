import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NoteService } from '../../services/note.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Note } from '../../interfaces/note';

@Component({
  selector: 'app-note-form',
  imports: [ReactiveFormsModule],
  templateUrl: './note-form.component.html',
  styleUrl: './note-form.component.scss',
})
export class NoteFormComponent {
  noteForm!: FormGroup;
  isEdit: boolean = false;
  successMessage: string | null = null;
  selectedNote: Note | null = null;

  @Output() close = new EventEmitter<void>();

  constructor(
    private noteService: NoteService,
    private formBuilder: FormBuilder
  ) {
    this.noteService.getEditable().subscribe({
      next: (response) => (this.isEdit = response),
    });
  }

  ngOnInit(): void {
    this.noteForm = this.formBuilder.group({
      id: new FormControl(null),
      title: [
        '',
        [
          Validators.required,
          Validators.pattern("^(?!^[0-9\\s]+$)[A-Za-z0-9'\\s]+$"),
        ],
      ],
      content: [
        '',
        [
          Validators.required,
          Validators.minLength(25),
          Validators.pattern("^(?!^[0-9\\s]+$)[A-Za-z0-9'\\s]+$"),
        ],
      ],
    });

    this.noteService.getEditable().subscribe({
      next: (response) => (this.isEdit = response),
    });

    this.noteService.getSelectedNote().subscribe({
      next: (note) => {
        if (note) {
          this.selectedNote = note;
          this.noteForm.patchValue(note); 
        }
      },
    });
  }

  onSubmit(): void {
    if (this.noteForm.invalid) {
      this.noteForm.markAllAsTouched();
      return;
    }

    const note: Note = this.noteForm.value;

    if (this.isEdit && this.selectedNote) {
      note.id = this.selectedNote.id;
      this.noteService.updateNote(note);
      this.successMessage = 'Note updated successfully!';
    } else {
      this.noteService.createNote(note);
      this.successMessage = 'Note added successfully!';
    }

    setTimeout(() => {
      this.successMessage = null;
      this.noteForm.reset();
      this.noteService.setEditable(false);
      this.noteService.setSelectedNote(null);
    }, 2000);
  }

  closeForm(): void {
    this.noteService.setEditable(false);
    this.noteService.setSelectedNote(null);
    this.close.emit();
  }
}
