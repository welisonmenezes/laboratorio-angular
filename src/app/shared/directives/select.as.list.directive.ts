import { Directive, ElementRef, OnInit, Input, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[selectAsList]'
})
export class SelectAsListDirective implements OnInit {
  
  //@Input() myControl: FormControl = null;

  @Input() selectAsList: FormControl = null;

  private myControl: FormControl;
  private select: HTMLInputElement;
  private parent: HTMLElement;
  private container: HTMLElement;
  private displayField: HTMLElement;
  private ul: HTMLElement;
  private options: NodeList;
  private selectedLi: HTMLElement;
  
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  
  ngOnInit(): void {

    this.myControl = this.selectAsList;

    this.createElements();

    this.listeOnClick();

    this.initWithDefaultValue();

  }

  // listen event click on parent directive
  private listeOnClick(): void{

    this.renderer.listen(this.container, 'click', ($event) => {

      this.toggleClass('opened');
      this.setValueOnClick($event.target);
    });
  }

  // toggle opened class
  private toggleClass(className: string): void{

    if(this.container.classList.contains(className)){

      this.renderer.removeClass(this.container, className);
    }else{

      this.renderer.addClass(this.container, className);
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

    let val: string = li.getAttribute('data-value');
    let txt: string = li.textContent;

    this.selectedLi = this.container.querySelector('li.selected');
    if(this.selectedLi){

      this.renderer.removeClass(this.selectedLi, 'selected');
    }

    this.renderer.addClass(li, 'selected');

    this.renderer.removeChild(this.displayField, this.displayField.firstChild);
    this.renderer.appendChild(this.displayField, this.renderer.createText(txt));

    if(this.myControl && isOnChange){

      this.myControl.setValue(val)
    }
  }

  initWithDefaultValue(): void{
    let allLi =this.parent.querySelectorAll('li');
    let i, total = allLi.length;

    for(i = 0; i < total; i++){

      let li: HTMLElement = allLi[i];
      let value = li.getAttribute('data-value');

      if(this.select.value === value){

        this.setNewValue(li, false);
      }
    }
  }

  createElements(): void{
    // get elements
    this.select = this.el.nativeElement;
    this.parent = <HTMLElement>this.select.parentNode;

    //this.select.hidden = true;
    this.renderer.setAttribute(this.select, 'hidden', 'true');

    // cria container
    this.container = this.renderer.createElement("div");
    this.renderer.addClass(this.container, 'wm-custom-select');
    this.renderer.addClass(this.container, 'form-control');

    // cria ul
    this.ul = this.renderer.createElement("ul");
    this.renderer.addClass(this.ul, 'custom-scrollbar');
    this.renderer.insertBefore(this.container, this.ul, null);

    // cria selected display
    this.displayField = this.renderer.createElement("div");
    this.renderer.addClass(this.displayField, 'display');
    this.renderer.addClass(this.displayField, 'field-default');
    this.renderer.insertBefore(this.container, this.displayField, this.ul);

    // cria listas
    this.options = this.select.querySelectorAll('option');
    if(this.options.length){
        let i: number, total: number = this.options.length;
        for(i = 0; i < total; i++){
            let opt: HTMLElement = <HTMLElement>this.options[i];
            let txt: string = opt.textContent;
            let val: string = opt.getAttribute('value');
            let isSelected: boolean = (val === this.select.value) ? true : false;
            
            let li: HTMLElement = this.renderer.createElement("li");
            this.renderer.appendChild(li, this.renderer.createText(txt));
            this.renderer.setAttribute(li, 'data-value', val);
            this.renderer.addClass(li, 'field-default');
            if(isSelected){
                this.renderer.addClass(li, 'selected');
                this.renderer.appendChild(this.displayField, this.renderer.createText(txt));
            }
            
            this.renderer.appendChild(this.ul, li);
        }
    }
    
    this.renderer.insertBefore(this.parent, this.container, this.select);
  }
}