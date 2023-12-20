import { Pipe, PipeTransform } from '@angular/core';
import { UserInterFace } from '../shared.model';


@Pipe({
  name: 'SortingTableData'
})
export class SortingTableDataPipe implements PipeTransform {
  transform(userList: UserInterFace[], ...args: [boolean, string]) {
    const [sortingStatus, keyName] = args;
    let sortingTableData = sortingStatus == true ? userList.sort((next: UserInterFace | any, prev: UserInterFace | any) =>
      (next[keyName] > prev[keyName]) ? 1 : -1) : userList.sort((next: UserInterFace | any, prev: UserInterFace | any) =>
        (next[keyName] < prev[keyName]) ? 1 : -1);
    return sortingTableData;
  };
};
