import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/cathegory.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    standalone: false
})
export class HomeComponent {
  constructor(
    private router: Router,
    private categoryService: CategoryService
  ) {}

  onCategoryCardClick(clickedCathegory: string): void {
    this.router.navigate(['/products']);
    this.categoryService.setSelectedCategory(clickedCathegory);
  }
}
