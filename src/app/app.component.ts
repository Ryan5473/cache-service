import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet  ,CommonModule,ArticlesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angularcachetest';
}
