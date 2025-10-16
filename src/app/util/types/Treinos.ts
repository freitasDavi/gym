export type GetTreinosResponse = {
  id: number;
  name: string;
  numberOfDays: number;
  completedDays: number;
  ativo: boolean;
};

export type GetTreinoResponse = {
  id: number;
  name: string;
  numberOfDays: number;
  completedDays: number;
  exercicios: GetExercicioResponse[];
};

export type GetExercicioResponse = {
  id: number;
  name: string;
  series: number;
  repeticoes: number;
  carga: number;
  urlImagem: string;
  descricao: string;
  tempoDescansoSegundos: number;
};
