import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { Joke } from '@yo-mom/api-interfaces';

import * as JokesActions from './jokes.actions';

export const JOKES_FEATURE_KEY = 'jokes';

export interface JokesState extends EntityState<Joke> {
  selectedId?: string | number; // which Jokes record has been selected
  loaded: boolean; // has the Jokes list been loaded
  error?: string | null; // last known error (if any)
}

export interface JokesAction extends Action {
  error: string;
}

export interface JokesPartialState {
  readonly [JOKES_FEATURE_KEY]: JokesState;
}

const setLoading = (state: JokesState) => ({
  ...state,
  loaded: false,
  error: null,
});

const setFailure = (state: JokesState, { error }: JokesAction) => ({
  ...state,
  error,
});

export const jokesAdapter: EntityAdapter<Joke> = createEntityAdapter<Joke>();

export const initialState: JokesState = jokesAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const _jokesReducer = createReducer(
  initialState,
  on(
    JokesActions.loadJoke,
    JokesActions.loadJokes,
    JokesActions.updateJoke,
    JokesActions.deleteJoke,
    setLoading
  ),
  on(
    JokesActions.loadJokeFailure,
    JokesActions.loadJokesFailure,
    JokesActions.updateJokeFailure,
    JokesActions.deleteJokeFailure,
    setFailure
  ),
  on(JokesActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(JokesActions.loadJokesSuccess, (state, { jokes }) =>
    jokesAdapter.setAll(jokes, { ...state, loaded: true })
  ),
  on(JokesActions.selectJoke, (state, { jokeId }) => ({
    ...state,
    selectedId: jokeId,
  })),
  on(JokesActions.loadJokeSuccess, (state, { joke }) =>
    jokesAdapter.upsertOne(joke, { ...state, loaded: true })
  ),
  on(JokesActions.updateJokeSuccess, (state, { joke: { id, ...restJoke } }) =>
    jokesAdapter.updateOne(
      { id, changes: { ...restJoke } },
      { ...state, loaded: true }
    )
  ),
  on(JokesActions.deleteJokeSuccess, (state, { id }) =>
    jokesAdapter.removeOne(id, { ...state, loaded: true })
  )
);

export function jokesReducer(state: JokesState | undefined, action: Action) {
  return _jokesReducer(state, action);
}
