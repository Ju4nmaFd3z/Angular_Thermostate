import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-control-temperature',
  imports: [],
  templateUrl: './control-temperature.component.html',
  styleUrl: './control-temperature.component.css'
})
export class ControlTemperatureComponent {

  // Inputs y outputs

  temperature = input.required<number>();
  umbralMax = input.required<number>();
  umbralMin = input.required<number>();
  temperatureOutput = output<number>();
  umbralMaxOutput = output<number>();
  umbralMinOutput = output<number>();

  // Propiedades y variables

  tempUpdate?: number;

  // Enventos y listeners

  onClickIncTemp() {
    this.tempUpdate = this.temperature() + 1;
    this.temperatureOutput.emit(this.tempUpdate);
  }

  onClickDecTemp() {
    this.tempUpdate = this.temperature() - 1;
    this.temperatureOutput.emit(this.tempUpdate);
  }

  onClickIncUmbralMax() {
    this.umbralMaxOutput.emit(this.umbralMax() + 1);
  }

  onClickDecUmbralMax() {
    this.umbralMaxOutput.emit(this.umbralMax() - 1);
  }

  onClickIncUmbralMin() {
    this.umbralMinOutput.emit(this.umbralMin() + 1);
  }

  onClickDecUmbralMin() {
    this.umbralMinOutput.emit(this.umbralMin() - 1);
  }

  onInput(event: Event) {
    // "as HTMLInputElement" solo se lo dice a TypeScript para poder leer .value; en ejecución no cambia nada.
    let inputElement = event.target as HTMLInputElement;

    // (input) salta con cada tecla; (change) solo al confirmar (Enter o perder el foco).

    // En JS, Number('2a') no lanza error: devuelve NaN, así que se comprueba con Number.isNaN().
    // Ojo: Number('') da 0, por eso también se descarta el campo vacío.
    // BigInt('2a') sí lanza SyntaxError, ahí sí valdría un try/catch.

    if (inputElement.id === 'umbralMax') {
      let umbralMax = Number(inputElement.value);
      if (inputElement.value.trim() === '' || Number.isNaN(umbralMax)) {
        inputElement.value = this.umbralMax().toString();
      } else {
        console.log('Se establece nuevo umbral máximo de temperatura: ' + umbralMax);
        this.umbralMaxOutput.emit(umbralMax);
      }
    } else if (inputElement.id === 'umbralMin') {
      let umbralMin = Number(inputElement.value);
      if (inputElement.value.trim() === '' || Number.isNaN(umbralMin)) {
        inputElement.value = this.umbralMin().toString();
      } else {
        console.log('Se establece nuevo umbral mínimo de temperatura: ' + umbralMin);
        this.umbralMinOutput.emit(umbralMin);
      }
    }
  }

}
