import { Component, inject, OnInit, signal } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CardComponent } from '../../../components/card/card.component';
import { GetTreinoResponse } from '../../../util/types/Treinos';
import { TreinosService } from '../../../services/treinos.service';
import { ActivatedRoute } from '@angular/router';

export type Exercicio = {
  id: number;
  title: string;
  image: string;
  description: string;
  numberOfExecutions: number;
  completed: boolean;
};

@Component({
  selector: 'app-calisthenics',
  imports: [CardComponent, FormsModule],
  templateUrl: './calisthenics.component.html',
  styleUrl: './calisthenics.component.css',
})
export class CalisthenicsComponent implements OnInit {
  title = 'gym';
  tempoDeDescanso = 3;
  estaDescansando = signal(false);
  tempoDeDescansoAlterado = signal(3);

  private dadosRota = inject(ActivatedRoute);
  treino: GetTreinoResponse | null = null;
  numeroDeExercicios = 0;
  numeroDeExerciciosConcluidos = 0;

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

  constructor(private treinoService: TreinosService) {}

  ngOnInit(): void {
    this.getTreinoAtivo();
  }

  getTreinoAtivo() {
    const treinoId = this.dadosRota.snapshot.paramMap.get('treinoId');

    if (!treinoId) {
      // TODO: Tratar erro de ID inválido e navegar para uma página de erro ou lista de treinos
      throw new Error('TreinoId não foi fornecido');
    }

    this.treinoService.getSelectedTreino(Number(treinoId)).subscribe({
      next: (response) => {
        this.treino = response;

        this.numeroDeExercicios = response.exercicios.length;
      },
      error: (error) => alert('Erro ao carregar treino:' + error),
    });
  }

  // iniciarDescanso() {
  //   let tempo = this.tempoDeDescanso * 60;
  //   this.estaDescansando.set(true);
  //   const intervalo = setInterval(() => {
  //     if (tempo > 0) {
  //       tempo--;
  //       this.tempoDeDescanso = tempo;
  //     } else {
  //       clearInterval(intervalo);
  //       this.tempoDeDescanso = this.tempoDeDescansoAlterado(); // Resetar para o valor inicial
  //       this.estaDescansando.set(false);
  //     }
  //   }, 1000);
  // }

  iniciarDescanso(tempoEmSegundos?: number) {
    let descanso = this.tempoDeDescanso * 60;

    if (tempoEmSegundos) {
      descanso = tempoEmSegundos;
    }

    let valorInicial = descanso;

    this.estaDescansando.set(true);

    const intervalo = setInterval(() => {
      if (descanso > 0) {
        descanso--;
        this.tempoDeDescanso = descanso;
      } else {
        clearInterval(intervalo);
        this.tempoDeDescanso = valorInicial;
        this.estaDescansando.set(false);
      }
    }, 1000);
  }

  atualizaTempoDeDescanso(valor?: string) {
    console.log('atualizando ' + valor);
    if (valor) {
      this.tempoDeDescansoAlterado.set(Number(valor));
      this.tempoDeDescanso = this.tempoDeDescansoAlterado();
    }
  }
}
