import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Joke } from '@yo-mom/api-interfaces';

@Component({
  selector: 'yo-mom-jokes-list',
  templateUrl: './jokes-list.component.html',
  styleUrls: ['./jokes-list.component.scss'],
})
export class JokesListComponent {
  @Input() jokes: Joke[] | null;
  @Input() readonly = false;
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
}
