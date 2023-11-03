import { Component } from '@angular/core';
import { SpinnerService } from '../../../core/services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  isLoading = this.spinnerService.isLoading;
  constructor(private spinnerService: SpinnerService) {}
}
