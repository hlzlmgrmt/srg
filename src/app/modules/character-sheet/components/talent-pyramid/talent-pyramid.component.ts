import { Component } from '@angular/core';

@Component({
  selector: 'srg-talent-pyramid',
  templateUrl: './talent-pyramid.component.html',
  styleUrl: './talent-pyramid.component.css'
})
export class TalentPyramidComponent {
  protected readonly tier5Amount: number = 10;

  protected readonly Array = Array;
}
