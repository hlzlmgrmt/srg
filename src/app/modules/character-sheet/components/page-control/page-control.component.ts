import {Component, input, output} from '@angular/core';
import {Character} from '../../types';

@Component({
  selector: 'srg-page-control',
  templateUrl: './page-control.component.html',
  styleUrl: './page-control.component.css'
})
export class PageControlComponent {
  readonly character = input<Character>();
  readonly rawCharacterDataImported = output<string>();

  downloadRawCharacterData(): void {
    let element = document.createElement('a');

    element.setAttribute('href', 'data:text/plain;charset=utf-8,'
      + encodeURIComponent(btoa(JSON.stringify(this.character()))));

    const fileName = this.character() ?
      this.character()!['heading'] ?
        this.character()!['heading']['alias'] ?
          (this.character()!['heading']['alias'] as string).toLowerCase()
            .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'\u005f')
          : 'shadowrunner'
        : 'shadowrunner'
      : 'shadowrunner';
    element.setAttribute('download', fileName + '.txt');
    console.error(fileName);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
}
