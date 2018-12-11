import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root'})
export class formSubmitService { 

    private formSubmited: Subject<boolean>;
    private formSubmited$: Observable<boolean>;

    constructor() {
        this.formSubmited = new Subject();
        this.formSubmited$ = this.formSubmited.asObservable();
    }

    getFormObservable(): Observable<boolean>{
        return this.formSubmited$;
    }

    emitFomrSubject(value: boolean){
        this.formSubmited.next(value);
    }
    
}