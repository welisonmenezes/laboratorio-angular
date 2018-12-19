import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { formSubmitService } from 'src/app/core/error-message/form-submit.service';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit {

  @Input() userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private formSubmitService: formSubmitService) {

    
  }

  ngOnInit() {
    //console.log(this.userForm);
    this.addItem();
    
  }

  hasMoreThanOneLanguages(): boolean {
    let form: FormArray = <FormArray>this.userForm.get('linguagens');
    return (form.controls.length > 1);
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      linguagem: [''],
      nivel: ['', Validators.required],
      tipo: ['operacao-3']
    });
  }

  addItem(): void {
    let form: FormArray = <FormArray>this.userForm.get('linguagens');
    form.controls.push(this.createItem());
  }

  removeItem(index: number){
    let form: FormArray = <FormArray>this.userForm.get('linguagens');
    form.removeAt(index);
  }

}
