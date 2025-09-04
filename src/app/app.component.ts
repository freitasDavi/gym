import { Component, signal } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { FormsModule } from '@angular/forms';

export type Exercicio = {
  id: number;
  title: string;
  image: string;
  description: string;
  numberOfExecutions: number;
  completed: boolean;
};

@Component({
  selector: 'app-root',
  imports: [CardComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'gym';
  tempoDeDescanso = 3;
  estaDescansando = signal(false);

  exercicios: Exercicio[] = [
    {
      id: 1,
      title: 'Flexão Padrão 5 x 13',
      description: 'Algo sobre o treino',
      numberOfExecutions: 5,
      image:
        'https://www.hipertrofia.org/blog/wp-content/uploads/2023/11/wide-hand-push-up.gif',
      completed: false,
    },
    {
      id: 2,
      title: 'Squat 90º 3 x 3 negativa',
      description: 'Faz exercicio, segura no fim da execução por 3 segundos.',
      numberOfExecutions: 3,
      image:
        'https://i.pinimg.com/originals/9e/40/fd/9e40fd0f60665b4acb6a53be828909d8.gif',
      completed: false,
    },
    {
      id: 3,
      title: 'Squat 90º 3 x 15',
      description: 'Algo sobre o treino',
      numberOfExecutions: 3,
      image:
        'https://i.pinimg.com/originals/9e/40/fd/9e40fd0f60665b4acb6a53be828909d8.gif',
      completed: false,
    },
    {
      id: 4,
      title: 'Elevated Hip Thrust 3 x 15',
      description: 'Algo sobre o treino',
      numberOfExecutions: 3,
      image: 'https://gymvisual.com/img/p/1/0/1/0/6/10106.gif',
      completed: false,
    },
    {
      id: 5,
      title: 'Prancha Abdominal 4 x 15',
      description: 'Algo sobre o treino',
      numberOfExecutions: 4,
      image:
        'https://grandeatleta.com.br/wp-content/uploads/2018/06/Prancha-abdominal-Ponte-ventral.gif',
      completed: false,
    },
  ];

  iniciarDescanso() {
    let tempo = this.tempoDeDescanso * 60;
    this.estaDescansando.set(true);
    const intervalo = setInterval(() => {
      if (tempo > 0) {
        tempo--;
        this.tempoDeDescanso = tempo;
      } else {
        clearInterval(intervalo);
        this.tempoDeDescanso = 3; // Resetar para o valor inicial
        this.estaDescansando.set(false);
      }
    }, 1000);
  }

  atualizaTempoDeDescanso(valor?: string) {
    console.log('atualizando ' + valor);
    if (valor) this.tempoDeDescanso = Number(valor);
  }
}
