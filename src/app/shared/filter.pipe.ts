import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(
    valuesArray: any[],
    filterString: string,
    productName: string
  ): any[] {
    const filteredResults: any = [];
    if (!valuesArray || filterString === '' || productName === '') {
      return valuesArray;
    }
    valuesArray.forEach((val: any) => {
      if (
        val[productName]
          .trim()
          .toLowerCase()
          .includes(filterString.toLowerCase())
      ) {
        filteredResults.push(val);
      }
    });
    console.log(filteredResults);
    return filteredResults;
  }
}
