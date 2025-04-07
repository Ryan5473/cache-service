import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent {
  articles: any[] = [];
  offset = 0;
  limit = 10;

  private dataService = inject(DataService);

  constructor() {
    this.loadArticles();
  }

  loadArticles() {
    const params = {
      offset: this.offset,
      limit: this.limit
    };

    // Updated URL to fetch data from the PokéAPI
    this.dataService.getData('https://pokeapi.co/api/v2/pokemon', params)
      .subscribe(data => {
        this.articles = data.results; // Pokémon data is in the `results` array
      });
  }

  clearArticles() {
    this.articles = [];
  }

  trackById(index: number, article: any) {
    return article.name; // Pokémon name is a unique identifier
  }
}
