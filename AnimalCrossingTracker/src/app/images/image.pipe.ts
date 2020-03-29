import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  defaultImage = './assets/imgs/unknown.png';

  constructor(private http: HttpClient) { }

  transform(url: string): any {
    return this.http
      .get(url).subscribe(res => {
        console.log(`returning: ${url}`);
        return url;
      }, error => {
        console.log(`returning error`);
        return this.defaultImage;
      });
  }
}
