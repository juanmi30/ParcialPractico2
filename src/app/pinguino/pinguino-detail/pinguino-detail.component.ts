import { Component, Input, OnInit } from '@angular/core';
import { Pinguino } from '../pinguino';
import { ActivatedRoute } from '@angular/router';
import { PinguinoService } from '../pinguino.service';

@Component({
  selector: 'app-pinguino-detail',
  templateUrl: './pinguino-detail.component.html',
  styleUrls: ['./pinguino-detail.component.css'],
})
export class PinguinoDetailComponent implements OnInit {
  pinguinoId!: string;
  @Input() pinguinoDetail!: Pinguino;

  constructor(
    private route: ActivatedRoute,
    private pinguinoService: PinguinoService
  ) {}

  getEspecie() {
    this.pinguinoService.getEspecie(this.pinguinoId).subscribe((especie) => {
      this.pinguinoDetail = especie;
    });
  }

  ngOnInit() {
    if (this.pinguinoDetail === undefined) {
      this.pinguinoId = this.route.snapshot.paramMap.get('id')!;
      if (this.pinguinoId) {
        this.getEspecie();
      }
    }
  }
}
