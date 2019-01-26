import { NgModule } from '@angular/core';
import { ViettelTvComponent } from './viettel-tv/viettel-tv';
import { FakeCustomerComponent } from './fake-customer/fake-customer';
import { QuestionAndAnswerComponent } from './question-and-answer/question-and-answer';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
@NgModule({
	declarations: [ViettelTvComponent,
		FakeCustomerComponent,
		QuestionAndAnswerComponent,
	],
	imports: [
		IonicModule,
		CommonModule
	],
	exports: [ViettelTvComponent,
		FakeCustomerComponent,
		QuestionAndAnswerComponent,
	]
})
export class ComponentsModule {}
