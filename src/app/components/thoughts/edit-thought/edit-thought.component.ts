import { Router, ActivatedRoute } from '@angular/router';
import { ThoughtService } from './../thought.service';
import { Ithought } from './../thought/thought.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-thought',
  templateUrl: './edit-thought.component.html',
  styleUrls: ['./edit-thought.component.scss'],
})
export class EditThoughtComponent implements OnInit {
  pensamento: Ithought = {
    autoria: '',
    conteudo: '',
    modelo: '',
  };

  constructor(
    private service: ThoughtService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.buscarPorId(Number(id)).subscribe({
      next: (thought) => {
        this.pensamento = thought;
      },
      error: () => {
        console.error('Erro ao buscar o id');
      },
    });
  }

  editar() {
    this.service.editar(this.pensamento).subscribe({
      next: () => {
        this.router.navigate(['/listThoughts']);
      },
      error: () => {
        console.error('Erro ao editar');
      },
    });
  }

  cancelar() {
    this.service.cancelar();
  }
}
