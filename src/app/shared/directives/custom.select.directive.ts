import { Directive, ElementRef, HostListener, Renderer, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[customSelect]'
})
export class CustomSelectDirective implements OnInit {
  
  @Input() myControl: FormControl = null;

  private hidedField: HTMLInputElement;
  private parent: HTMLElement;
  private displayField: HTMLElement;
  private selectedLi: HTMLElement;
  
  constructor(private el: ElementRef, private renderer: Renderer) {}
  
  ngOnInit(): void {

    // get elements
    this.hidedField = this.el.nativeElement;
    this.parent = this.hidedField.parentElement;
    this.displayField = this.parent.querySelector('.display');
    this.selectedLi = this.parent.querySelector('li.selected');

    this.listeOnClick();

    let allLi =this.parent.querySelectorAll('li');
    let i, total = allLi.length;

    for(i = 0; i < total; i++){

      let li: HTMLElement = allLi[i];
      let value = li.getAttribute('data-value');

      if(this.hidedField.value === value){

        this.setNewValue(li, false);
      }
    }
  }

  // listen event click on parent directive
  private listeOnClick(): void{

    this.renderer.listen(this.parent, 'click', ($event) => {

      this.toggleClass('opened');
      this.setValueOnClick($event.target);
    });
  }

  // toggle opened class
  private toggleClass(className: string): void{

    if(this.parent.classList.contains(className)){

      this.renderer.setElementClass(this.parent, className, false);
    }else{

      this.renderer.setElementClass(this.parent, className, true);
    }
  }

  // if click is on LI elemnte, fire!
  private setValueOnClick(eventTarget: HTMLElement){

    if(eventTarget && eventTarget.tagName === "LI"){

      let li: HTMLElement = eventTarget;
      this.setNewValue(li, true);
    }
  }

  // set new value and update view
  private setNewValue(li: HTMLElement, isOnChange: boolean): void{

    let value: string = li.getAttribute('data-value');
    let text: string = li.textContent;

    this.selectedLi = this.parent.querySelector('li.selected');
    if(this.selectedLi){

      this.renderer.setElementClass(this.selectedLi, 'selected', false);
    }

    this.renderer.setElementClass(li, 'selected', true);

    this.displayField.textContent = text;

    if(this.myControl && isOnChange){

      this.myControl.setValue(value)
    }
  }
}