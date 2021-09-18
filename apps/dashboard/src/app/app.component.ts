import { Component } from '@angular/core';

@Component({
  selector: 'yo-mom-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Yo-MOMMA!';
  links = [{ path: 'jokes', icon: 'view_list', title: 'Yo-Momma' }];
}
