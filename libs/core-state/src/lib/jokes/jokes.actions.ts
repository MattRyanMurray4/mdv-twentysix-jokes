import { createAction, props } from '@ngrx/store';
import { JokesEntity } from './jokes.models';
import { Joke } from '@yo-mom/api-interfaces';
export const init = createAction('[Jokes Page] Init');

// LOAD ALL

export const loadJokes = createAction('[Jokes] Load Jokes');

export const loadJokesSuccess = createAction(
  '[Jokes] Loaded Jokes Success',
  props<{ jokes: Joke[] }>()
);

export const loadJokesFailure = createAction(
  '[Jokes] Loaded Jokes Failure',
  props<{ error: any }>()
);

// LOAD SINGULAR

export const loadJoke = createAction(
  '[Joke] Load A Joke ',
  props<{ id: string }>()
);
export const loadJokeSuccess = createAction(
  '[Joke] Load A Joke Success',
  props<{ joke: Joke }>()
);
export const loadJokeFailure = createAction(
  '[Joke] Load A Joke Failure',
  props<{ error: any }>()
);

// SELECT

export const selectJoke = createAction(
  '[Joke] Selected A Joke',
  props<{ jokeId: string }>()
);

// UPDATE

export const updateJoke = createAction(
  '[Joke] Update Joke',
  props<{ joke: Joke }>()
);
export const updateJokeSuccess = createAction(
  '[Joke] Updated Joke Success',
  props<{ joke: Joke }>()
);
export const updateJokeFailure = createAction(
  '[Joke] Updated Joke Failure',
  props<{ error: any }>()
);

// DELETE

export const deleteJoke = createAction(
  '[Joke] Delete Joke',
  props<{ joke: Joke }>()
);
export const deleteJokeSuccess = createAction(
  '[Joke] Delete Joke Success',
  props<{ id: string }>()
);
export const deleteJokeFailure = createAction(
  '[Joke] Delete Joke Failure',
  props<{ error: any }>()
);
