import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(
    fetchedProductsArray: any[],
    searchString: string,
    title: string
  ): any[] {
    const filteredResults: any = [];
    if (!fetchedProductsArray || searchString === '' || title === '') {
      return fetchedProductsArray;
    }
    fetchedProductsArray.forEach((fetchedProduct: any) => {
      if (
        fetchedProduct[title]
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
