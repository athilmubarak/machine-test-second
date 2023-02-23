import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  //Variable
  selected_route?: string;
  title = 'machine-test';

  constructor() { }

  ngOnInit(): void {
    this.selected_route = window.location.pathname;
  }
}
