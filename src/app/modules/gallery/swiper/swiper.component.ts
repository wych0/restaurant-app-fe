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
    slidesPerView: 3,
    spaceBetween: 20,
    breakpoints: {
      320: {
        slidesPerView: 1.2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1280: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
    pagination: {
      clickable: true,
    },
  };
}
