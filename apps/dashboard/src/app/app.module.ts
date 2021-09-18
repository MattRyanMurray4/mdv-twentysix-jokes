import { MaterialModule } from '@yo-mom/material';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JokeComponent } from './joke/joke.component';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JokesListComponent } from './joke/jokes-list/jokes-list.component';
import { JokesDetailsComponent } from './joke/jokes-details/jokes-details.component';
import { CoreDataModule } from '@yo-mom/core-data';
import { CoreStateModule } from '@yo-mom/core-state';
import { UiLibraryModule } from '@yo-mom/ui-library';
import { RoutingModule } from './routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    JokeComponent,
    JokesDetailsComponent,
    JokesListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    CoreDataModule,
    CoreStateModule,
    UiLibraryModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
