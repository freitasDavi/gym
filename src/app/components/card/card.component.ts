import { Component, input, output } from '@angular/core';
import { LucideAngularModule, Check } from 'lucide-angular';
import { GetExercicioResponse } from '../../util/types/Treinos';

@Component({
  selector: 'app-card',
  imports: [LucideAngularModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  exercicio = input<GetExercicioResponse>();

  readonly check = Check;
  estaDescansando = input(false);
  iniciaDescanso = output<number | undefined>();

  numeroExecucoes = 0;

  finalizaRepeticao() {
    if (this.numeroExecucoes < this.exercicio()!.repeticoes) {
      this.numeroExecucoes++;
      this.iniciaDescanso.emit(this.exercicio()?.tempoDescansoSegundos);

      if (this.numeroExecucoes == this.exercicio()!.repeticoes) {
        // this.exercicio()!.completed = true;
        alert('Parabéns! Você finalizou o exercício.');
      }

      return;
    }

    alert('Você já finalizou o exercício, vá para o próximo.');
  }
}
