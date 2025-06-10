import { MainFormComponent } from './generated-forms/mainform/mainform.component';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-root',
  imports: [MainFormComponent, MatCardModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'desktop-AmzOpsAngular';
}
