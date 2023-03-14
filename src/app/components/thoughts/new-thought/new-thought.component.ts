import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThoughtService } from '../thought.service';
import { Ithought } from '../thought/thought.interface';

@Component({
  selector: 'app-new-thought',
  templateUrl: './new-thought.component.html',
  styleUrls: ['./new-thought.component.scss'],
})
export class NewThoughtComponent implements OnInit {
  pensamento: Ithought = {
    conteudo: '',
    autoria: '',
    modelo: '',
  };

  constructor(public service: ThoughtService, private router: Router) {}

  ngOnInit(): void {}

  criarPensamento() {
    this.service.criar(this.pensamento).subscribe(() => {
      this.router.navigate(['/listThoughts']);
    });
  }
}
