import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  headerStyles: any = '';
  constructor(private renderer: Renderer2, private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.url;
        if (currentUrl === '/') {
          this.headerStyles = {
            'background-color': 'rgba(255, 255, 255, 0.7)',
          };
        } else {
          this.headerStyles = {
            'background-color': 'white',
          };
        }
      }
    });
    this.addAttributes();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event): void {
    this.addAttributes();
  }

  addAttributes() {
    const ulElement = document.querySelector('ul.navbar-nav');

    if (window.innerWidth < 992) {
      this.renderer.setAttribute(ulElement, 'data-bs-target', '#navbarNav');
      this.renderer.setAttribute(ulElement, 'data-bs-toggle', 'collapse');
    } else {
      this.renderer.removeAttribute(ulElement, 'data-bs-target');
      this.renderer.removeAttribute(ulElement, 'data-bs-toggle');
    }
  }
}
