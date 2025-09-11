import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { CalisthenicsComponent } from './pages/treino/calisthenics/calisthenics.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'calisthenics',
        component: CalisthenicsComponent,
      },
    ],
  },
];
