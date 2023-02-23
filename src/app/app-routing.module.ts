import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStoryComponent } from './components/add-story/add-story.component';
import { SprintsComponent } from './components/sprints/sprints.component';
import { StoriesComponent } from './components/stories/stories.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/stories' },
  { path: 'stories', component: StoriesComponent },
  { path: 'sprints', component: SprintsComponent },
  { path: 'add-story', component: AddStoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
