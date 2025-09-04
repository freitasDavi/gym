import { Component, input, output, signal } from '@angular/core';
import { LucideAngularModule, Check } from 'lucide-angular';
import { Exercicio } from '../../app.component';

@Component({
  selector: 'app-card',
  imports: [LucideAngularModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  exercicio = input<Exercicio>();

  readonly check = Check;
  estaDescansando = input(false);
  iniciaDescanso = output<void>();

  numeroExecucoes = 0;

  finalizaRepeticao() {
    console.log('Finalizou uma repetição');
    if (this.numeroExecucoes < this.exercicio()!.numberOfExecutions) {
      this.numeroExecucoes++;
      this.iniciaDescanso.emit();

      if (this.numeroExecucoes == this.exercicio()!.numberOfExecutions) {
        this.exercicio()!.completed = true;
        alert('Parabéns! Você finalizou o exercício.');
      }

      return;
    }

    alert('Você já finalizou o exercício, vá para o próximo.');
  }
}
