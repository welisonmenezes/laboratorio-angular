import { formSubmitService } from './../../core/error-message/form-submit.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { extensionsValidator } from '../../shared/validators/extencions.validator';

import { IUser } from '../../shared/models/user';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  userForm: FormGroup;
  linguagens: FormArray;
  //formSubmited: Subject<boolean>;
  

  constructor(private formBuilder: FormBuilder, private formSubmitService: formSubmitService) {
    //this.formSubmited = false;
    //this.formSubmited = new Subject();
  }

  ngOnInit() {
    
    this.userForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['',
        [
          Validators.required,
          Validators.email
        ]
      ],
      telefone: [''],
      arquivo: [null,
        [
          extensionsValidator,
          Validators.required
        ]
      ],
      arquivo2: [null],
      linguagens: this.formBuilder.array([
        this.createItem()
      ])
    });

    this.linguagens = this.userForm.get('linguagens') as FormArray;

    //this.userForm.valueChanges.subscribe(v => console.log('desde subscribe', v));
  }
  

  createItem(): FormGroup {
    return this.formBuilder.group({
      linguagem: [''],
      nivel: ['', Validators.required],
      tipo: ['operacao-3']
    });
  }

  addItem(): void {
    this.linguagens.push(this.createItem());
  }

  removeItem(index: number){
    this.linguagens.removeAt(index);
  }

  hasMoreThanOneLanguages(): boolean {
    return (this.linguagens.length > 1);
  }

  sendForm(){
    //console.log(this.userForm)
    //this.userForm.get('nome').
    //this.formSubmited.next(true);
    this.formSubmitService.emitFomrSubject(true);

    if(this.userForm.invalid){
      //console.log('inválido');
      this.setAllControlsAsDirty(this.userForm);
      this.userForm.markAsDirty();
    }else{

      const dados = this.userForm.getRawValue() as IUser;
      //console.log(dados);
    }
  
  }

  setAllControlsAsDirty(formGroup: any): void{
    
    if(formGroup.constructor.name === "FormGroup" &&  formGroup.controls){

      for(let group in formGroup.controls){

        let current: any = formGroup.controls[group];

        if(current.constructor.name === "FormGroup" || current.constructor.name === "FormArray"){

          this.setAllControlsAsDirty(current);
        }else if(current.constructor.name === "FormControl"){
          
          //console.log('é invalido?', current)
          if(current.erros){
            if(current.errors.extensions){

              current.setValue(null);
            }else{

              current.setValue(current.value);
            }
            //current.setValue(null);
            current.markAsDirty();
            //current.markAsPristine();
          }
          //console.log(current)
          //current.setValue(current.value);
          //current.markAsDirty();
        }
      }
    }else if(formGroup.constructor.name === "FormArray" &&  formGroup.controls){
      
      let i, total = formGroup.controls.length;
      for(i = 0; i < total; i++){

        if(formGroup.controls[i].constructor.name === "FormGroup"){
          
          this.setAllControlsAsDirty(formGroup.controls[i]);
        }else if(formGroup.controls[i].constructor.name === "FormControl"){
          //console.log(formGroup.controls[i])
          //formGroup.controls[i].markAsDirty();
          if(formGroup.controls[i].errors){
            //formGroup.controls[i].setValue(formGroup.controls[i].value);
            if(formGroup.controls[i].errors.extensions){

              formGroup.controls[i].setValue(null);
            }else{

              formGroup.controls[i].setValue(formGroup.controls[i].value);
            }
            formGroup.controls[i].markAsDirty();
          }

        }
      }
    }
  }
  
  onFileChange(event) {
    let reader = new FileReader();
   
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      //console.log(file)
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.userForm.patchValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result
        });
        
        console.log('onFileChange', this.userForm);
      };
    }
  }

  validateExt(c: FormControl) {
      let extension = ['png', 'jpeg', 'gif'];
      return extension.indexOf(c.value)? null : { validateExt: { valid: false } }
  }

}
