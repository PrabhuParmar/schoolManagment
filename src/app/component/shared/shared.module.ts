import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipePipe } from './pipe/search-pipe.pipe';
import { SortingTableDataPipe } from './pipe/sorting-table-data.pipe';



@NgModule({
  declarations: [
    SearchPipePipe,
    SortingTableDataPipe,

  ],
  imports: [
    CommonModule
  ],
  exports: [
    SortingTableDataPipe,
    SearchPipePipe,
  ],
  providers: []
})
export class SharedModule { }
