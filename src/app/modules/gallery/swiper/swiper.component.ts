import { Component, ElementRef, ViewChild } from '@angular/core';
import { Swiper } from 'swiper';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
})
export class SwiperComponent {
  title = 'swiper-tutorial';
  swiper?: Swiper;
  @ViewChild('swiperRef')
  swiperRef: ElementRef | undefined;
  ngAfterViewInit() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  public config: SwiperOptions = {
    navigation: true,
    breakpoints: {
      320: {
        slidesPerView: 1.2,
        spaceBetween: 20,
      },
      480: {
        slidesPerView: 1.5,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 1.7,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 2.1,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 2.5,
        spaceBetween: 20,
      },
      1600: {
        slidesPerView: 3.5,
        spaceBetween: 20,
      },
    },
    pagination: {
      clickable: true,
    },
  };
}
