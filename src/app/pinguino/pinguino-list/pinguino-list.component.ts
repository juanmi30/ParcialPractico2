import { Component, OnInit } from '@angular/core';
import { Pinguino } from '../pinguino';
import { PinguinoService } from '../pinguino.service';

@Component({
  selector: 'app-pinguino-list',
  templateUrl: './pinguino-list.component.html',
  styleUrls: ['./pinguino-list.component.css'],
})
export class PinguinoListComponent implements OnInit {
  especies: Array<Pinguino> = [];
  mayor_especie!: Pinguino;
  selectedEspecie!: Pinguino;
  selected: Boolean = false;

  constructor(private pinguinoService: PinguinoService) {}

  onSelected(pinguino: Pinguino) {
    this.selected = true;
    this.selectedEspecie = pinguino;
  }

  getEspecies(): void {
    this.pinguinoService.getEspecies().subscribe((especies) => {
      this.especies = especies;
      this.mayor_especie = especies[0];
    });
  }

  getMayorEspecie(especies: Pinguino[]) {
    let num_paises: number = 0;
    let array: Array<string> = [];
    especies.forEach((especie) => {
      this.mayor_especie = especie;
      let temp = 0;
      array = especie.global_distribution.split(',');
      temp = array.length;
      if (temp > num_paises) {
        num_paises = temp;
        this.mayor_especie = especie;
      }
    });
  }

  ngOnInit(): void {
    this.getEspecies();
    this.getMayorEspecie(this.especies);
  }
}
