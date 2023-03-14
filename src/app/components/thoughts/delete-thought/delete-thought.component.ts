import { Ithought } from './../thought/thought.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ThoughtService } from './../thought.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-thought',
  templateUrl: './delete-thought.component.html',
  styleUrls: ['./delete-thought.component.scss'],
})
export class DeleteThoughtComponent implements OnInit {
  thought!: Ithought;

  constructor(
    private service: ThoughtService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route?.snapshot?.paramMap?.get('id');
    this.service.buscarPorId(Number(id)).subscribe({
      next: (thought) => {
        this.thought = thought;
      },
      error: (err) => {
        console.error('Id pensamento não encontrado');
      },
    });
  }

  cancelar() {
    this.service.cancelar();
  }

  excluir() {
    if (this.thought.id)
      this.service.excluir(this.thought.id).subscribe({
        next: () => {
          this.router.navigate(['/listThoughts']);
        },
        error: (err) => {
          console.error('Erro ao excluir pensamento!');
        },
      });
  }
}
