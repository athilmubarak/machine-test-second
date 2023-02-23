import { Injectable } from '@angular/core';
import { Sprint } from '../models/sprint.types';
import { Story } from '../models/story.types';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  //Variables
  stories: Story[] = [];
  sprints: Sprint[] = [];

  constructor() {
    this.stories = [
      { story_name: 'Story One', story_point: 2 },
      { story_name: 'Story Two', story_point: 3 },
      { story_name: 'Story Three', story_point: 4 },
      { story_name: 'Story Four', story_point: 5 },
      { story_name: 'Story Five', story_point: 1 }
    ];

    this.sprints = [
      {
        name: 'Sprint One',
        capacity: 4,
        stories: [
          { story_name: 'Story Three', story_point: 4 }
        ]
      },
      {
        name: 'Sprint Two',
        capacity: 4,
        stories: [
          { story_name: 'Story Five', story_point: 1 },
          { story_name: 'Story Two', story_point: 3 }
        ]
      },
    ];
  }
}
