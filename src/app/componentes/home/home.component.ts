import { Component, OnInit, ViewChild, ElementRef, Inject, HostListener } from '@angular/core';
declare var $;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  onScroll(){
    $([document.documentElement, document.body]).animate({
      scrollTop: $("#secao-02").offset().top
  }, 1500);

  }

  ngOnInit() {
  }

}
