import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { IUser } from '../../shared/models/user';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  userForm: FormGroup;
  linguagens: FormArray;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['',
        [
          Validators.required,
          Validators.email
        ]
      ],
      telefone: ['', Validators.required],
      arquivo: [null, Validators.required],
      linguagens: this.formBuilder.array([
        this.createItem()
      ])
    });

    this.linguagens = this.userForm.get('linguagens') as FormArray;

    //this.userForm.valueChanges.subscribe(v => console.log('desde subscribe', v));
  }
  

  createItem(): FormGroup {
    return this.formBuilder.group({
      linguagem: ['', Validators.required],
      nivel: ['', Validators.required],
      tipo: ['operacao-3', Validators.required]
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
    this.setAllControlsAsDirty(this.userForm);
    this.userForm.markAsDirty();

    const dados = this.userForm.getRawValue() as IUser;
    console.log(dados);
  }

  setAllControlsAsDirty(formGroup: any): void{
    
    if(formGroup.constructor.name === "FormGroup" &&  formGroup.controls){

      for(let group in formGroup.controls){

        let current: any = formGroup.controls[group];

        if(current.constructor.name === "FormGroup" || current.constructor.name === "FormArray"){

          this.setAllControlsAsDirty(current);
        }else if(current.constructor.name === "FormControl"){
          

          current.setValue(current.value);
          current.markAsDirty();
        }
      }
    }else if(formGroup.constructor.name === "FormArray"){
      
      let i, total = formGroup.controls.length;
      for(i = 0; i < total; i++){

        if(formGroup.controls[i].constructor.name === "FormGroup"){
          
          this.setAllControlsAsDirty(formGroup.controls[i]);
        }else if(formGroup.controls[i].constructor.name === "FormControl"){

          formGroup.controls[i].markAsDirty();
        }
      }
    }
  }
  
  onFileChange(event) {
    let reader = new FileReader();
   
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.userForm.patchValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result
        });
        
        console.log(this.userForm);
      };
    }
  }

}
