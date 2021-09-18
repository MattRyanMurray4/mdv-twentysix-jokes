import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootStoreConfig, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { JokesEffects } from './jokes/jokes.effects';
import { JokesFacade } from './jokes/jokes.facade';
import { reducers } from '.';

const storeConfig: RootStoreConfig<any> = {
  runtimeChecks: {
    strictActionImmutability: true,
    strictStateImmutability: true,
  },
};

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, storeConfig),
    EffectsModule.forRoot([JokesEffects]),
    StoreDevtoolsModule.instrument({ name: 'Yo-Momma-App' }),
  ],
  providers: [JokesFacade],
})
export class CoreStateModule {}
