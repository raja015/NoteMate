import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';

import { title } from 'process';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {

  @Input('title') title:string;
  @Input('body') body:string;
  @Input()  link:string;
  @Output('delete')  deleteEvent:EventEmitter<void>= new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  onXButtonClick(){
      this.deleteEvent.emit();
  }

}
