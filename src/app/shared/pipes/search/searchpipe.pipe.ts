import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchpipe'
})
export class SearchpipePipe implements PipeTransform {

  transform(arr:any[],searchkey:string):any[] {
    return arr.filter((current)=>current.title.toLowerCase().includes(searchkey.toLowerCase()));
  }

}
