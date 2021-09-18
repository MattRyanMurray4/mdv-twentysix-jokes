import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Joke } from '@yo-mom/api-interfaces';

@Component({
  selector: 'yo-mom-jokes-details',
  templateUrl: './jokes-details.component.html',
  styleUrls: ['./jokes-details.component.scss'],
})
export class JokesDetailsComponent {
  currentJoke: Joke;
  originalName: string;

  @Input() set joke(value: Joke | null) {
    if (value) this.originalName = value.joke;
    this.currentJoke = Object.assign({}, value);
  }

  @Input() form: FormGroup;

  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  save(joke: Joke) {
    this.saved.emit(joke);
  }

  cancel() {
    this.cancelled.emit();
  }

  saveForm(formDirective: FormGroupDirective) {
    if (formDirective.invalid) return;
    this.saved.emit(formDirective.value);
    formDirective.resetForm();
  }
}
