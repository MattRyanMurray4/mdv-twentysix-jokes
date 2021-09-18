import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { emptyJoke, Joke } from '@yo-mom/api-interfaces';
import { JokesFacade } from '@yo-mom/core-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'yo-mom-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.scss'],
})
export class JokeComponent implements OnInit {
  form: FormGroup;
  jokes$: Observable<Joke[]> = this.jokesFacade.allJokes$;
  selectedJoke$: Observable<Joke> = this.jokesFacade.selectedJokes$;
  constructor(
    private jokesFacade: JokesFacade,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
    this.jokesFacade.loadJokes();
    this.reset();
  }

  selectJoke(joke: Joke) {
    this.jokesFacade.selectJoke(joke.id);
    this.form.patchValue(joke);
  }

  reset() {
    this.selectJoke(emptyJoke);
    this.form.reset();
  }

  updateJoke(joke: Joke) {
    this.jokesFacade.updateJoke(joke);
    this.reset();
  }

  deleteJoke(joke: Joke) {
    this.jokesFacade.deleteJoke(joke);
    this.reset();
  }

  cancel() {
    this.reset();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      id: null,
      joke: [''],
    });
  }
}
