import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private selectedCategorySubject: BehaviorSubject<string | undefined> =
    new BehaviorSubject<string | undefined>(undefined);
  public selectedCategory$: Observable<string | undefined>;

  constructor() {
    this.selectedCategory$ = this.selectedCategorySubject.asObservable();
  }

  setSelectedCategory(category: string): void {
    this.selectedCategorySubject.next(category);
  }

  getSelectedCategory(): Observable<string | undefined> {
    return this.selectedCategory$;
  }
}
