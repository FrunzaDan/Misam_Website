import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private selectedCategorySubject = new BehaviorSubject<string | undefined>(
    undefined
  );
  public selectedCategory$: Observable<string | undefined>;

  constructor() {
    this.selectedCategory$ = this.selectedCategorySubject.asObservable();
  }

  setSelectedCategory(category: string) {
    this.selectedCategorySubject.next(category);
  }

  getSelectedCategory(): Observable<string | undefined> {
    return this.selectedCategory$;
  }
}
