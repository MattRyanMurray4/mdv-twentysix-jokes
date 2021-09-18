import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { of } from 'rxjs';
import { map, tap, catchError, switchMap } from 'rxjs/operators';
import {
  loadJoke,
  loadJokeFailure,
  loadJokeSuccess,
  loadJokes,
  loadJokesFailure,
  loadJokesSuccess,
  updateJoke,
  updateJokeFailure,
  updateJokeSuccess,
  deleteJoke,
  deleteJokeFailure,
  deleteJokeSuccess,
} from './jokes.actions';
import { JokesService } from '@yo-mom/core-data';
import * as JokesActions from './jokes.actions';
import * as JokesFeature from './jokes.reducer';

@Injectable()
export class JokesEffects {
  loadJokes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadJokes),
      switchMap(() =>
        this.jokesService.getAll().pipe(
          tap(console.log),
          map((jokes) => loadJokesSuccess({ jokes })),
          catchError((error) => of(loadJokesFailure({ error })))
        )
      )
    )
  );

  loadJoke$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadJoke),
      switchMap(({ id }) =>
        this.jokesService.findOne(id).pipe(
          map((joke) => loadJokeSuccess({ joke })),
          catchError((error) => of(loadJokeFailure({ error })))
        )
      )
    )
  );

  updateJoke$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateJoke),
      switchMap(({ joke }) =>
        this.jokesService.update(joke).pipe(
          map((joke) => updateJokeSuccess({ joke })),
          catchError((error) => of(updateJokeFailure({ error })))
        )
      )
    )
  );

  deleteJoke$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteJoke),
      switchMap(({ joke }) =>
        this.jokesService.delete(joke.id).pipe(
          map((id) => deleteJokeSuccess({ id })),
          catchError((error) => of(deleteJokeFailure({ error })))
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private jokesService: JokesService
  ) {}
}
