import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  isActive = false;
  handleScroll() {
    const scrollY = window.scrollY
    if (scrollY > 10) {
      document.getElementById("header")?.classList.add("scrollClass")
      this.isActive = true
    } else {
      document.getElementById("header")?.classList.remove("scrollClass")
      this.isActive = false
    }
  }

  constructor() { }

  ngOnInit(): void {
    window.addEventListener("scroll", this.handleScroll);
  }

}
