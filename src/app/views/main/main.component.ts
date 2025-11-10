import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  slides = [
    {img: "assets/images/Banner ver. 1.png"},
    {img: "assets/images/Banner ver. 2.png"},
    {img: "assets/images/Banner ver. 3.png"},
  ];
  slideConfig = {"slidesToShow": 3, "slidesToScroll": 3};

  addSlide() {
    this.slides.push({img: "http://placehold.it/350x150/777777"})
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e: any) {
    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    console.log('afterChange');
  }

  beforeChange(e: any) {
    console.log('beforeChange');
  }

  constructor() { }

  ngOnInit(): void {
  }

}
