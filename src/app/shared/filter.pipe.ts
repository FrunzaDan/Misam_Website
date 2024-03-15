import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(
    fetchedProductsList: Product[],
    searchString: string,
    title: string
  ): Product[] {
    const filteredResults: Product[] = [];
    if (!fetchedProductsList || searchString === '' || title === '') {
      return fetchedProductsList;
    }
    fetchedProductsList.forEach((fetchedProduct: Product) => {
      if (
        fetchedProduct.title
          .trim()
          .toLowerCase()
          .includes(searchString.toLowerCase())
      ) {
        filteredResults.push(fetchedProduct);
      }
    });
    return filteredResults;
  }
}
