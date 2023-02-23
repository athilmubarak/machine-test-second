import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Sprint } from 'src/app/models/sprint.types';
import { Story } from 'src/app/models/story.types';
import { StoryService } from 'src/app/services/story.service';

@Component({
  selector: 'app-sprints',
  templateUrl: './sprints.component.html',
  styleUrls: ['./sprints.component.scss']
})
export class SprintsComponent implements OnInit {

  //Mat-table related variables
  data_source = new MatTableDataSource<Story>();

  //Variables
  selected_sprint?: Sprint;
  show_stories: boolean = false;

  constructor(
    public story_service: StoryService
  ) { }

  ngOnInit(): void {
  }

  clickSprint(sprint: Sprint) {
    this.selected_sprint = sprint;
    this.data_source = new MatTableDataSource(sprint.stories);
    this.show_stories = true;
  }

}
