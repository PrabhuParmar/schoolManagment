import { Pipe, PipeTransform } from '@angular/core';
import { UserInterFace } from '../interFace/user-inter-face';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {
  // find school name 
  transform(value: UserInterFace | any, ...args: string[]) {
    let [searchValue] = args;

    if (searchValue == null) {
      searchValue = '';
    };
    let selectedData = value.filter((data: UserInterFace | any) => {
      if (data.toString().toLowerCase().trim().search(searchValue.toLowerCase().trim()) !== -1) {
        return data;
      };
    });
    return selectedData.length == 0 ? selectedData = ['No Record Found!'] : selectedData;
  };
};
