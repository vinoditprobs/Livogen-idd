import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent {


  agreeToConditions: boolean = true;
  siteKey: string = '6Le6yQ8nAAAAADNhGMhtjZFjk4nGVl8PDMxROAjC';
  
  constructor(private router: Router) {}

  handleReset(){console.log('handleReset')}
  handleLoad(){
    console.log('handleLoad')
  }
  handleSuccess($event: any){
    console.log('handleSuccess')
  }
  handleExpire(){console.log('handleExpire')}
}
