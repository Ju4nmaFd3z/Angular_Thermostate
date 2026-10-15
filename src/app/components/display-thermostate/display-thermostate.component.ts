import { Component, input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-display-thermostate',
  imports: [],
  templateUrl: './display-thermostate.component.html',
  styleUrl: './display-thermostate.component.css',
  host: {
    '[class.warning-max]': 'alarmMax',
    '[class.warning-min]': 'alarmMin'
  }
})
export class DisplayThermostateComponent implements OnChanges {

  // Hooks - onChanges se lanza cuando hay un cambio en los inputs del componente
  ngOnChanges(changes: SimpleChanges): void {

    if (changes['temperature'] || changes['umbralMax'] || changes['umbralMin']) {
      this.alarmMax = this.temperature() > this.umbralMax();
      this.alarmMin = this.temperature() < this.umbralMin();
    }

  }

  // Inputs y outputs
  temperature = input.required<number>();
  umbralMax = input.required<number>();
  umbralMin = input.required<number>();

  // Propiedades y variables
  alarmMax = false;
  alarmMin = false;

}
