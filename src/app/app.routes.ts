import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { CalisthenicsComponent } from './pages/treino/calisthenics/calisthenics.component';
import { ChallengeComponent } from './pages/challenge/challenge.component';
import { TreinoComponent } from './pages/treino/treino.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'calisthenics',
        component: CalisthenicsComponent,
      },
      {
        path: 'challenge',
        component: ChallengeComponent,
      },
      {
        path: 'treinos',
        component: TreinoComponent,
      },
    ],
  },
];
