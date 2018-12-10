import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {

  @Input() errors: any;
  private message: string = null;
  private hasError: boolean = false;
  @ViewChild('messageContainer') el:ElementRef;
  private element: HTMLElement;

  constructor(private renderer: Renderer2) {
    
  }

  ngOnInit() {
    //console.log(this.errors.required);
    if(this.errors){
      this.hasError = true;
    }
    else{
      this.hasError = false;
    }

    if(this.errors && this.errors.required){
      this.message = "Campo obrigatório";
    }
  }

  closeMessage(): void{
    this.element = this.el.nativeElement;
    this.renderer.removeChild(this.element.parentElement, this.element);
  }

}
