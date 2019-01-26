import { Component } from '@angular/core';

/**
 * Generated class for the ViettelTvComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'viettel-tv',
  templateUrl: 'viettel-tv.html'
})
export class ViettelTvComponent {

  text: string;

  constructor() {
    console.log('Hello ViettelTvComponent Component');
    this.text = 'Hello World';
  }

}
