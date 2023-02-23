import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { StoryService } from 'src/app/services/story.service';

@Component({
  selector: 'app-add-story',
  templateUrl: './add-story.component.html',
  styleUrls: ['./add-story.component.scss']
})
export class AddStoryComponent implements OnInit {

  //Forms
  story_form: FormGroup = new FormGroup({});
  search_input = new Subject<string>();

  constructor(
    private form_builder: FormBuilder,
    private story_service: StoryService,
    private router: Router
  ) {
    this.search_input.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe(value => {
        let story = this.story_service.stories.find(x => x.story_name.toLowerCase() === value.toLowerCase());

        if (story != null) {
          this.story_form?.get('story_name')?.setErrors({ 'notValid': true });
        } else {
          this.story_form?.get('story_name')?.clearValidators();
        }
      });
  }

  ngOnInit(): void {
    this.story_form = this.form_builder.group({
      story_name: new FormControl('', [Validators.required, Validators.pattern(/^[^\s]/)]),
      story_point: new FormControl('', [Validators.required, Validators.min(1)])
    });
  }

  /**
   * to check for duplication of story
   * 
   */
  checkForDuplication() {
    let story_name = this.story_form.get('story_name')?.value;

    if (![null, undefined, '', ' '].includes(story_name)) {
      this.search_input.next(story_name);
    }
  }

  /**
   * to add new story
   * 
   * @returns 
   */
  addNewStory() {
    if (this.story_form?.invalid) {
      return;
    } else {
      let story = this.story_service.stories.find(x => x.story_name.toLowerCase() === this.story_form?.get('story_name')?.value.toLowerCase());

      if (story == null) {
        this.story_service.stories.push(this.story_form?.value);
        this.router.navigate(['/stories']);
      } else {
        this.story_form?.get('story_name')?.setErrors({ 'notValid': true });
      }
    }
  }

}
