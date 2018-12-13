import { FormControl } from '@angular/forms';
import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { formSubmitService } from './form-submit.service';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {

  @Input() control: FormControl;
  @Input() submitService: formSubmitService;
  private message: string = null;
  private hasError: boolean = false;
  @ViewChild('messageContainer') el:ElementRef;
  private element: HTMLElement;

  constructor(private renderer: Renderer2) {
    
  }

  ngOnInit() {
    //console.log(this.control);
    //console.log('ngOnInit',this.formSubmited$);
    //if(this.submitService){
      this.submitService.getFormObservable().subscribe(v => {
        //console.log(this.control.errors);
        this.control.markAsDirty();
        //console.log(this.control.pristine);
        this.setValidations();
      });
   // }
    

    this.control.root.valueChanges.subscribe(v => {
      this.setValidations();
    });
    // this.control.root.statusChanges.subscribe(v => {
    //   this.setValidations();
    // });

    //this.setValidations();
    
  }

  setValidations(): void{

    if(this.control.errors){

      if(!this.control.pristine){

        this.hasError = true;
      }else{

        this.hasError = false;
      }

      this.setErrorsMessages();

    }else{

      this.hasError = false;
    }

  }

  setErrorsMessages(): void {

    if(this.control.errors.required){

      this.message = "Campo obrigatório";
    }else if(this.control.errors.email){

      this.message = "E-mail inválido!";
    }else if(this.control.errors.extensions){

      this.message = "Tipo de arquivo inválido!";
    }else{

      this.message = "";
    }
  }

  closeMessage(): void{
    this.element = this.el.nativeElement;
    this.renderer.removeChild(this.element.parentElement, this.element);
  }

}
