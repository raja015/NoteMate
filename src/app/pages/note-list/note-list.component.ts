import { Component, OnInit } from '@angular/core';

import {Note} from 'src/app/shared/note.model';
import{NotesService} from 'src/app/shared/notes.service';
@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {

  notes: Note[]=new Array<Note>();
  filteredNotes: Note[] = new Array<Note>();
  constructor(private noteService:NotesService) { }

  ngOnInit(): void {
    this.notes=this.noteService.getAll();
    this.filteredNotes=this.notes;
  }
  deleteNote(id:number){
    this.noteService.delete(id);
  }
  filter(query:string){
    query=query.toLowerCase().trim();

    let allResults: Note[] = new Array<Note>();
    let terms:string[] = query.split(' ');

    terms = this.removeDuplicate(terms);

    terms.forEach(term=>{
      let results: Note[] = this.releventNotes(term);
      allResults=[...allResults,...results]
    });
    let uniqueResults= this.removeDuplicate(allResults);

    this.filteredNotes=uniqueResults;
  }

  removeDuplicate(arr: Array<any> ) : Array<any> {
    let uniqueResults:Set<any> = new Set<any>();

    arr.forEach(e=>uniqueResults.add(e));
    return Array.from(uniqueResults);
  }

  releventNotes(query: string): Array<Note>{
    query = query.toLowerCase().trim();
    let releventNotes= this.notes.filter(note =>{
      if(note.title && note.title.toLowerCase().includes(query)){
        return true;
      }
      if(note.body && note.body.toLowerCase().includes(query)){
        return true;
      }

      return false;
    })
    return releventNotes;
  }

}
