import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Story } from 'src/app/models/story.types';
import { StoryService } from 'src/app/services/story.service';

@Component({
  selector: 'app-filter-stories',
  templateUrl: './filter-stories.component.html',
  styleUrls: ['./filter-stories.component.scss']
})
export class FilterStoriesComponent implements OnInit {

  //Form
  sprint_form: FormGroup = new FormGroup({});

  search_input = new Subject<string>();

  //Mat-table related variables
  data_source = new MatTableDataSource<Story>();
  displayed_columns: string[] = ['story_name', 'story_point', 'select'];
  selection = new SelectionModel<Story>(true, []);

  constructor(
    private form_builder: FormBuilder,
    private story_service: StoryService,
    private route: Router
  ) {
    this.search_input.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe(value => {
        let story = this.story_service.sprints.find(x => x.name.toLowerCase() === value.toLowerCase());

        if (story != null) {
          this.sprint_form?.get('name')?.setErrors({ 'notValid': true });
        } else {
          this.sprint_form?.get('name')?.clearValidators();
        }
      });
  }

  ngOnInit(): void {
    this.sprint_form = this.form_builder.group({
      name: new FormControl('', [Validators.required, Validators.pattern(/^[^\s]/)]),
      capacity: new FormControl('', [Validators.required, Validators.min(1)]),
      stories: new FormControl([])
    });
    this.data_source = new MatTableDataSource(this.story_service.stories);
  }

  /**
  * to check for duplication of story
  * 
  */
  checkForDuplication() {
    let story_name = this.sprint_form.get('name')?.value;

    if (![null, undefined, '', ' '].includes(story_name)) {
      this.search_input.next(story_name);
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.data_source.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    // this.selection.select(...this.data_source.data);
    this.addingStories();
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Story): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }

    if (this.selection.isSelected(row)) {
      if (this.getTotalPoints() > this.sprint_form.get('capacity')?.value) {
        this.selection.deselect(row);
      }
    }

    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.story_point + 1}`;
  }

  /**
   * to auto select stories
   * 
   * @returns 
   */
  autoSelectStories() {
    if (this.sprint_form.invalid) {
      return;
    } else {
      this.addingStories();
      this.data_source = new MatTableDataSource(this.selection.selected);
    }
  }

  /**
   * to clear stories from created sprint
   */
  clearSprint() {
    this.selection.clear();
    this.data_source = new MatTableDataSource(this.story_service.stories);
  }

  /**
   * to clear the created stories
   */
  clearStories() {
    this.story_service.stories = [];
    this.clearSprint();
  }

  getTotalPoints() {
    return this.selection.selected.map(t => t.story_point).reduce((acc, value) => acc + value, 0);
  }

  /**
   * to add stories by checking sprint capacity
   */
  addingStories() {
    let stories = this.story_service.stories.sort((a, b) => (a < b ? -1 : 1));

    let story = stories.find(x => x.story_point == this.sprint_form.get('capacity')?.value);

    if (story != null) {
      this.selection.select(story);
    } else {
      stories.forEach(story => {
        if ((this.getTotalPoints() + story.story_point) <= this.sprint_form.get('capacity')?.value) {
          this.selection.select(story);
        }
      });
    }
  }

  /**
   * to add new sprint
   * 
   * @returns 
   */
  addNewSprint() {
    if (this.sprint_form.invalid && this.selection.selected.length === 0) {
      return;
    } else {
      this.sprint_form.patchValue({
        stories: this.selection.selected
      });
      this.story_service.sprints.push(this.sprint_form.value);
      this.route.navigate(['/sprints']);
    }
  }
}
