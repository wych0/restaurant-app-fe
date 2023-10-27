import { ElementRef } from '@angular/core';
import { FocusInvalidInputDirective } from './focus-invalid-input.directive';

describe('FocusInvalidInputDirective', () => {
  it('should create an instance', () => {
    const directive = new FocusInvalidInputDirective(element);
    expect(directive).toBeTruthy();
  });
});
