import { Component, Input } from '@angular/core';
import { Ithought } from './thought.interface';

@Component({
  selector: 'app-thought',
  templateUrl: './thought.component.html',
  styleUrls: ['./thought.component.scss'],
})
export class ThoughtComponent {
  @Input() thought: Ithought = {
    modelo: '',
    autoria: '',
    conteudo: '',
  };

  constructor() {}

  defineCardSize(): string {
    if (this.thought.conteudo.length >= 256) {
      return 'pensamento-g';
    }

    return 'pensamento-p';
  }
}
