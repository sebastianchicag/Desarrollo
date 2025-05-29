import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
sidebarOpen = false;
screenIsLarge = false;
constructor(public router: Router) {}


ngOnInit() {
  this.updateScreenSize();
  window.addEventListener('resize', this.updateScreenSize.bind(this));
}

updateScreenSize() {
  this.screenIsLarge = window.innerWidth >= 640;
  if (this.screenIsLarge) {
    this.sidebarOpen = true;
  }
}

}
