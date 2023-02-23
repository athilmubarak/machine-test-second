import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoriesComponent } from './components/stories/stories.component';
import { AddStoryComponent } from './components/add-story/add-story.component';
import { FilterStoriesComponent } from './components/filter-stories/filter-stories.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SprintsComponent } from './components/sprints/sprints.component';
import { NoDataComponent } from './components/no-data/no-data.component';


@NgModule({
  declarations: [
    AppComponent,
    StoriesComponent,
    AddStoryComponent,
    FilterStoriesComponent,
    SprintsComponent,
    NoDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
