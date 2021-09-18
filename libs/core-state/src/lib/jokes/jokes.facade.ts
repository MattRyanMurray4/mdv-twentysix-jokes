import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';
import { Joke } from '@yo-mom/api-interfaces';

import * as JokesActions from './jokes.actions';
import * as JokesFeature from './jokes.reducer';
import * as JokesSelectors from './jokes.selectors';

@Injectable()
export class JokesFacade {
  loaded$ = this.store.pipe(select(JokesSelectors.getJokesLoaded));
  allJokes$ = this.store.pipe(select(JokesSelectors.getAllJokes));
  selectedJokes$ = this.store.pipe(select(JokesSelectors.getSelected));

  constructor(private readonly store: Store) {}

  init() {
    this.store.dispatch(JokesActions.init());
  }

  loadJokes() {
    return this.store.dispatch(JokesActions.loadJokes());
  }

  loadJoke(id: string) {
    return this.store.dispatch(JokesActions.loadJoke({ id }));
  }

  selectJoke(jokeId: string) {
    return this.store.dispatch(JokesActions.selectJoke({ jokeId }));
  }

  updateJoke(joke: Joke) {
    return this.store.dispatch(JokesActions.updateJoke({ joke }));
  }

  deleteJoke(joke: Joke) {
    return this.store.dispatch(JokesActions.deleteJoke({ joke }));
  }

  private dispatch(action: Action) {
    return this.store.dispatch(action);
  }
}
