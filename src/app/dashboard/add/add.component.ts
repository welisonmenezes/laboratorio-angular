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
      email: ['', Validators.required],
      telefone: ['', Validators.required],
      arquivo: [null, Validators.required],
      linguagens: this.formBuilder.array([
        this.createItem()
      ])
    });

    this.linguagens = this.userForm.get('linguagens') as FormArray;

    this.userForm.valueChanges.subscribe(v => console.log('desde subscribe', v));
  }
  

  createItem(): FormGroup {
    return this.formBuilder.group({
      linguagem: ['', Validators.required],
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
    const dados = this.userForm.getRawValue() as IUser;
    console.log(dados);
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
