import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStoryComponent } from './components/add-story/add-story.component';
import { FilterStoriesComponent } from './components/filter-stories/filter-stories.component';
import { SprintsComponent } from './components/sprints/sprints.component';
import { StoriesComponent } from './components/stories/stories.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/stories' },
  { path: 'stories', component: StoriesComponent },
  { path: 'sprints', component: SprintsComponent },
  { path: 'add-story', component: AddStoryComponent },
  { path: 'create-sprint', component: FilterStoriesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
