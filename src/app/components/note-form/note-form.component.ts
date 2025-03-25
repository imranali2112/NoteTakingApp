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
  @Input() selectedNotes!: Note;
  isEdit:boolean = false;
  sucessMessage:string | null = null;

  @Output() close = new EventEmitter<void>();
  constructor(private noterService:NoteService, private formBulider:FormBuilder){
    this.noterService.getEditable().subscribe({
      next: (response)=>(this.isEdit = response)
    })
  }

  ngOnInit():void{
    this.noteForm = this.formBulider.group({
      id:new Date().getTime(),
      title:['',[Validators.required, Validators.pattern("^(?!^[0-9\s]+$)[A-Za-z0-9'\\s]+$"
      )]],
      content:['',[Validators.required, Validators.minLength(25), Validators.pattern("^(?!^[0-9\s]+$)[A-Za-z0-9'\\s]+$")]],
    });
  }

  onSubmit():void{
    if(this.noteForm.invalid){
      this.noteForm.markAllAsTouched(); 
      return;
    }
    const note: Note = this.noteForm.value;
    this.noterService.createNote(note);
    this.noteForm.reset();
    this.sucessMessage = "Your notes added sucessfully!"

    setTimeout(() => {
      this.sucessMessage = null;
      this.noteForm.reset();
    },2000);
  }
 

  closeForm():void{
    this.close.emit();
  }
}
