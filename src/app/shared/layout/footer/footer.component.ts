import { Component, OnInit } from '@angular/core';
import {MyDialogData} from "../../../../types/mydialog-data.type";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {


  dataService: MyDialogData = {
    title: "Закажите бесплатную консультацию",
    mode: 'call',
    buttonText: 'Перезвоните мне',
    style: 'button btn-footer'
  }

  constructor() { }

  ngOnInit(): void {
  }

}
