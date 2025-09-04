import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  title = input('');
  image = input('');
  description = input('');
  numeroRepeticoes = input(3);

  numeroExecucoes = 0;

  finalizaRepeticao() {
    if (this.numeroExecucoes < this.numeroRepeticoes()) {
      this.numeroExecucoes++;

      if (this.numeroExecucoes == this.numeroRepeticoes())
        alert('Parabéns! Você finalizou o exercício.');

      return;
    }

    alert('Você já finalizou o exercício, vá para o próximo.');
  }
}
