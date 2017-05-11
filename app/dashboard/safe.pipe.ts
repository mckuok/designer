import {DomSanitizer} from "@angular/platform-browser";
import {PipeTransform, Pipe} from "@angular/core";
@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
