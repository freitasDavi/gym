import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GetTreinosResponse } from '../../util/types/Treinos';
import { TreinosService } from '../../services/treinos.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-treino',
  imports: [RouterLink, NgClass],
  templateUrl: './treino.component.html',
  styleUrl: './treino.component.css',
})
export class TreinoComponent implements OnInit {
  usersTreino: GetTreinosResponse[] | null = null;

  constructor(private treinosService: TreinosService) {}

  ngOnInit(): void {
    this.getUserTreinos();
  }

  getUserTreinos() {
    this.treinosService.getUserTreinos().subscribe({
      next: (response) => {
        console.log(response);
        this.usersTreino = response;
      },
      error: (error) => alert(error),
    });
  }
}
