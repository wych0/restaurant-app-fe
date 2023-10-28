import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { SwiperOptions } from 'swiper/types';
import { register } from 'swiper/element/bundle';

register();

@Directive({
  selector: '[swiperElement]',
})
export class SwiperDirective implements AfterViewInit {
  private swiperElement: HTMLElement;
  @Input('config')
  config?: SwiperOptions;

  constructor(
    private element: ElementRef<HTMLElement & { initialize: () => void }>
  ) {
    this.swiperElement = element.nativeElement;
  }

  ngAfterViewInit(): void {
    Object.assign(this.element.nativeElement, this.config);
    this.element.nativeElement.initialize();
  }
}
