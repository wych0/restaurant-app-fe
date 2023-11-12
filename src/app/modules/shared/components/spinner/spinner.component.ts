import { Component, Input, OnInit } from '@angular/core';
import { SpinnerService } from '../../../core/services/spinner.service';
import { Size } from 'src/app/modules/core/models/spinner.model';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
  @Input({ required: true }) size!: Size;
  isLoading = this.spinnerService.isLoading;
  diameter!: number;

  constructor(private spinnerService: SpinnerService) {}
  ngOnInit(): void {
    switch (this.size) {
      case Size.BIG:
        this.diameter = 80;
        break;
      case Size.MEDIUM:
        this.diameter = 50;
        break;
      case Size.SMALL:
        this.diameter = 35;
        break;
    }
  }
}
