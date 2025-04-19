import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "../../navbar/nav/nav.component";

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, NavComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
